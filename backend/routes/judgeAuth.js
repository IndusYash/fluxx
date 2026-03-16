import express from 'express';
import jwt from 'jsonwebtoken';
import JudgeModel from '../models/judgeModel.js';
import ScoreModel from '../models/scoreModel.js';
import ApplicationModel from '../models/applicationModel.js';
import { supabase } from '../extrasTaken/supabase.js';

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const getStoragePathFromPublicUrl = (url) => {
    if (!url || typeof url !== 'string') return null;
    const marker = '/storage/v1/object/public/';
    const idx = url.indexOf(marker);
    if (idx === -1) return null;
    return decodeURIComponent(url.slice(idx + marker.length));
};

const withSignedImageUrl = async (item) => {
    if (!item?.imageUrl || !supabase) return item;

    const storagePath = getStoragePathFromPublicUrl(item.imageUrl);
    if (!storagePath) return item;

    const slash = storagePath.indexOf('/');
    if (slash <= 0) return item;

    const bucket = storagePath.slice(0, slash);
    const objectPath = storagePath.slice(slash + 1);
    if (!bucket || !objectPath) return item;

    const { data, error } = await supabase.storage.from(bucket).createSignedUrl(objectPath, 60 * 60);
    if (error || !data?.signedUrl) return item;

    return { ...item, imageUrl: data.signedUrl };
};

// ── Middleware: verify judge JWT ──────────────────────────────────────────────
const judgeAuth = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(auth.slice(7), process.env.JWT_SECRET);
    if (decoded.role !== 'judge') {
      return res.status(403).json({ message: 'Not a judge account' });
    }
    req.judge = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// ── POST /api/judge-auth/login ────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }
    const judge = await JudgeModel.findOne({ email: email.toLowerCase().trim() });
    if (!judge) {
      console.log(`[Login Failed] Judge not found for email: ${email}`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const ok = await judge.comparePassword(password);
    if (!ok) {
      console.log(`[Login Failed] Password mismatch for email: ${email}`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { id: judge._id, email: judge.email, name: judge.name, role: 'judge' },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    res.json({ token, judge: { name: judge.name, email: judge.email } });
  } catch (err) {
    console.error('[judge-auth/login]', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ── POST /api/judge-auth/add-judge  (requires JUDGE_ADMIN_SECRET header/body) ─
router.post('/add-judge', async (req, res) => {
  try {
    const { name, email, password, adminSecret } = req.body;
    if (!adminSecret || adminSecret !== process.env.JWT_SECRET) {
      return res.status(403).json({ message: 'Forbidden: invalid admin secret' });
    }
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'name, email and password are required' });
    }
    const existing = await JudgeModel.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(400).json({ message: 'Judge with this email already exists' });
    }
    const judge = new JudgeModel({ name, email, password });
    await judge.save();
    res.status(201).json({ message: 'Judge created', judge: { name: judge.name, email: judge.email } });
  } catch (err) {
    console.error('[judge-auth/add-judge]', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ── GET /api/judge-auth/applications  (judge only) ───────────────────────────
router.get('/applications', judgeAuth, async (req, res) => {
  try {
    const apps = await ApplicationModel.find(
      {},
      {
        name: 1, rollNo: 1, branch: 1, year: 1, section: 1,
        email: 1, phone: 1, residence: 1, linkedinProfile: 1, githubProfile: 1,
        prevSociety: 1, softSkills: 1, hardSkills: 1, projectsDesc: 1,
        introduction: 1, strengths: 1, weaknesses: 1, achievements: 1,
        whyJoin: 1, imageUrl: 1, resumeUrl: 1, createdAt: 1,
      }
    ).sort({ createdAt: -1 });

    // Attach this judge's own score (if any) to each application
    const myScores = await ScoreModel.find({ judgeId: req.judge.id });
    const scoreMap = {};
    myScores.forEach(s => { scoreMap[s.applicationId.toString()] = s; });

    const result = apps.map(a => ({
      ...a.toObject(),
      myScore: scoreMap[a._id.toString()] || null,
    }));

    const withImages = await Promise.all(result.map(withSignedImageUrl));

    res.json(withImages);
  } catch (err) {
    console.error('[judge-auth/applications]', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ── POST /api/judge-auth/score  (judge only) ─────────────────────────────────
router.post('/score', judgeAuth, async (req, res) => {
  try {
    const { applicationId, categories, overall, remarks, status } = req.body;
    if (!applicationId || !categories) {
      return res.status(400).json({ message: 'applicationId and categories are required' });
    }
    const existing = await ScoreModel.findOne({ applicationId, judgeId: req.judge.id });
    if (existing) {
      existing.categories = categories;
      existing.overall    = overall ?? 5;
      existing.remarks    = remarks || '';
      existing.status     = status  || 'hold';
      await existing.save();
      return res.json({ message: 'Score updated', score: existing });
    }
    const newScore = new ScoreModel({
      applicationId,
      judgeId:   req.judge.id,
      judgeName: req.judge.name,
      categories,
      overall:  overall ?? 5,
      remarks:  remarks || '',
      status:   status  || 'hold',
    });
    await newScore.save();
    res.status(201).json({ message: 'Score saved', score: newScore });
  } catch (err) {
    console.error('[judge-auth/score]', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ── GET /api/judge-auth/leaderboard  (judge only) ──────────────────────────
router.get('/leaderboard', judgeAuth, async (req, res) => {
  try {
    const apps = await ApplicationModel.find(
      {},
      { name:1, rollNo:1, branch:1, year:1, section:1, domain:1, imageUrl:1 }
    );
    const allScores = await ScoreModel.find({});
    const CAT_KEYS  = ['communication','webDev','dsa','projects','creative','management'];

    const scoresByApp = {};
    allScores.forEach(s => {
      const id = s.applicationId.toString();
      if (!scoresByApp[id]) scoresByApp[id] = [];
      scoresByApp[id].push(s);
    });

    const result = apps.map(app => {
      const scores     = scoresByApp[app._id.toString()] || [];
      const judgeCount = scores.length;

      const avgCategories = {};
      CAT_KEYS.forEach(cat => {
        const vals = scores.map(s => s.categories?.[cat] || 0).filter(v => v > 0);
        avgCategories[cat] = vals.length
          ? Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10
          : 0;
      });

      const overallVals = scores.map(s => s.overall || 0).filter(v => v > 0);
      const avgOverall = overallVals.length
        ? Math.round((overallVals.reduce((a, b) => a + b, 0) / overallVals.length) * 10) / 10
        : 0;

      const statusCount = { selected: 0, rejected: 0, hold: 0 };
      scores.forEach(s => { if (s.status) statusCount[s.status] = (statusCount[s.status] || 0) + 1; });
      const maxCount = Math.max(...Object.values(statusCount));
      const consensusStatus = maxCount === 0 ? null
        : Object.keys(statusCount).find(k => statusCount[k] === maxCount);

      const myScore = scores.find(s => s.judgeId.toString() === req.judge.id) || null;

      return { ...app.toObject(), judgeCount, avgOverall, avgCategories, consensusStatus, myScore };
    });

    const withImages = await Promise.all(result.map(withSignedImageUrl));
    withImages.sort((a, b) => b.avgOverall - a.avgOverall);
    res.json(withImages);
  } catch (err) {
    console.error('[judge-auth/leaderboard]', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
