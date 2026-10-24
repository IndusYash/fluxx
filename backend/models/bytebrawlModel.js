import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["LEADER", "MEMBER", "INDIVIDUAL"],
    required: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  collegeName: {
    type: String,
    default: "",
    trim: true,
  },
  address: {
    type: String,
    default: "",
    trim: true,
  },
  rollNumber: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  branch: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: String,
    required: true,
    trim: true,
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const bytebrawlRegistrationSchema = new mongoose.Schema(
  {
    registrationId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      index: true,
    },
    eventSlug: {
      type: String,
      default: "bytebrawl-hacktoberfest",
      index: true,
    },
    type: {
      type: String,
      enum: ["TEAM", "INDIVIDUAL"],
      required: true,
    },
    teamName: {
      type: String,
      trim: true,
      default: null,
      index: true,
    },
    agreedRules: {
      type: Boolean,
      default: true,
    },
    confirmedDetails: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      default: "CONFIRMED",
    },
    participants: {
      type: [participantSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: "bytebrawl_registrations",
  }
);

// Compound indexes for rapid conflict and uniqueness checks
bytebrawlRegistrationSchema.index({ eventSlug: 1, "participants.rollNumber": 1 });
bytebrawlRegistrationSchema.index({ eventSlug: 1, "participants.email": 1 });
bytebrawlRegistrationSchema.index({ eventSlug: 1, teamName: 1 });

const ByteBrawlRegistration =
  mongoose.models.ByteBrawlRegistration ||
  mongoose.model("ByteBrawlRegistration", bytebrawlRegistrationSchema);

export const ByteBrawlRegistrationBackup =
  mongoose.models.ByteBrawlRegistrationBackup ||
  mongoose.model("ByteBrawlRegistrationBackup", bytebrawlRegistrationSchema, "bytebrawl_registrations_backup");

export default ByteBrawlRegistration;
