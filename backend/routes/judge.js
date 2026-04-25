import express from 'express';
import authentication from '../middleware/authMiddleware.js'; // This assumes general auth, but we might want judge specific or pass decoded user
import Score from '../models/scoreModel.js';
import ApplicationModel from '../models/applicationModel.js';

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// POST /api/judge/score - submit score for a candidate
router.post('/score', async (req, res) => {
    try {
        // Expect header Authorization: Bearer <token> handled by frontend, 
        // but here we just need body. Ideally middleware verifies judge.
        // For now, let's assume body has judgeId/judgeName from frontend auth state.
        const { applicationId, judgeId, judgeName, categories, overall, remarks, status } = req.body;

        if (!applicationId || !judgeId) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Upsert score
        const numericOverall = Number(overall) || 0;
        const score = await Score.findOneAndUpdate(
            { applicationId, judgeId },
            {
                judgeName,
                categories,
                overall: numericOverall,
                remarks,
                status
            },
            { new: true, upsert: true }
        );

        return res.status(200).json({ message: "Score saved", score });
    } catch (err) {
        console.error("Score save error:", err);
        return res.status(500).json({ error: "Server error saving score" });
    }
});

export default router;