import mongoose from 'mongoose';

const sheLeadsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: 200,
    },
    rollNo: {
      type: String,
      required: [true, 'Roll number is required'],
      trim: true,
      uppercase: true,
      maxlength: 50,
    },
    branch: {
      type: String,
      required: [true, 'Branch is required'],
      trim: true,
      maxlength: 100,
    },
    section: {
      type: String,
      required: [true, 'Section is required'],
      trim: true,
      uppercase: true,
      maxlength: 20,
    },
    year: {
      type: String,
      required: [true, 'Year is required'],
      trim: true,
      maxlength: 30,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true,
      minlength: 10,
      maxlength: 15,
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      trim: true,
      default: 'Prefer not to say',
    },
    ticketNumber: {
      type: String,
      trim: true,
    },
    interests: {
      type: [String],
      default: [],
    },
    experienceLevel: {
      type: String,
      default: 'Beginner',
    },
    status: {
      type: String,
      default: 'registered',
      enum: ['registered', 'confirmed', 'attended', 'cancelled'],
    },
    registrationSource: {
      type: String,
      default: 'web-form', // 'web-form' or 'home-popup'
    },
  },
  { timestamps: true }
);

// Helpful compound and unique indexes
sheLeadsSchema.index({ email: 1 });
sheLeadsSchema.index({ rollNo: 1 });
sheLeadsSchema.index({ phone: 1 });

const SheLeadsModel =
  mongoose.models.SheLeads || mongoose.model('SheLeads', sheLeadsSchema);

export default SheLeadsModel;
