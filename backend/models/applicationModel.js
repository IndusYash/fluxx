import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    // Personal Information
    name: { type: String, required: true, maxlength: 200 },
    rollNo: { type: String, required: true, unique: true, minlength: 10, maxlength: 10 },
    branch: { type: String, required: true, maxlength: 200 },
    year: { type: String, required: true, maxlength: 20 },
    section: { type: String, default: '' },
    
    // Contact Information
    phone: { type: String, required: true, unique: true, minlength: 6, maxlength: 20 },
    email: { type: String, required: true, unique: true },
    linkedinProfile: { type: String, default: '' },
    githubProfile: { type: String, default: '' },
    residence: { type: String, default: '' },
    
    // Domain & Interests
    domain: { type: [String], default: [] },
    domainReason: { type: String, default: '' },
    
    // Previous Experience
    prevSociety: { type: String, default: '' },
    prevRole: { type: String, default: '' },
    availability: { type: String, default: '' },
    
    // Skills
    softSkills: { type: String, default: '' },
    hardSkills: { type: String, default: '' },
    
    // Coding Profiles
    dsaLevel: { type: String, default: '' },
    leetcodeHandle: { type: String, default: '' },
    codeforcesHandle: { type: String, default: '' },
    codechefHandle: { type: String, default: '' },
    
    // Projects & Achievements
    projectsDesc: { type: String, default: '' },
    achievements: { type: String, default: '' },
    
    // Personal Essay
    introduction: { type: String, default: '' },
    strengths: { type: String, default: '' },
    weaknesses: { type: String, default: '' },
    whyJoin: { type: String, required: true },
    expectation: { type: String, default: '' },
    
    // Files
    imageUrl: { type: String, default: '' },
    resumeUrl: { type: String, default: '' },
    
    // Legacy fields (for old form compatibility)
    society: { type: String, default: 'None', maxlength: 200 },
  },
  { timestamps: true }
);

const ApplicationModel =
  mongoose.models.Application || mongoose.model('Application', applicationSchema);

export default ApplicationModel;
