import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema(
  {
    applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Application', required: true },
    judgeId:       { type: mongoose.Schema.Types.ObjectId, ref: 'Judge',       required: true },
    judgeName:     { type: String, required: true },
    // Per-skill category scores (1–10 each)
    categories: {
      communication: { type: Number, min: 1, max: 10, default: 5 },
      webDev:        { type: Number, min: 1, max: 10, default: 5 },
      dsa:           { type: Number, min: 1, max: 10, default: 5 },
      projects:      { type: Number, min: 1, max: 10, default: 5 },
      creative:      { type: Number, min: 1, max: 10, default: 5 },
      management:    { type: Number, min: 1, max: 10, default: 5 },
    },
    overall:  { type: Number, min: 1, max: 10, default: 5 }, // avg of all categories
    remarks:  { type: String, default: '' },
    status:   { type: String, enum: ['selected', 'rejected', 'hold'], default: 'hold' },
  },
  { timestamps: true }
);

// One judge → one score per application
scoreSchema.index({ applicationId: 1, judgeId: 1 }, { unique: true });

export default mongoose.models.Score || mongoose.model('Score', scoreSchema);
