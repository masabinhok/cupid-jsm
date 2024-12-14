import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    middleName: { type: String, default: null },
    lastName: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      validate: {
        validator: validator.isEmail,
        message: "{VALUE} is not a valid email",
      },
    },
    secret: { type: String, default: null },
    otpGeneratedAt: { type: Date, default: null },
    gender: { type: String, enum: ["Male", "Female", "Non-binary", "Other"] },
    dateOfBirth: {
      type: Date,
      validate: {
        validator: (value) => {
          const today = new Date();
          const age = today.getFullYear() - value.getFullYear();
          const hasBirthdayPassed =
            today.getMonth() > value.getMonth() ||
            (today.getMonth() === value.getMonth() && today.getDate() >= value.getDate());
          return age > 18 || (age === 18 && hasBirthdayPassed);
        },
        message: "User must be at least 18 years old",
      },
    },
    profilePicture: { type: String, default: "default.jpg" },
    bio: { type: String, maxlength: 500 },
    interests: [{ type: String, maxlength: 50 }],
    location: {
      city: { type: String },
      country: { type: String },
      coordinates: {
        type: { type: String, enum: ["Point"],  },
        coordinates: { type: [Number], index: "2dsphere" },
      },
    },
    preference: {
      gender: {
        type: String,
        enum: ["Male", "Female", "Non-binary", "Everyone"],
        default: "Everyone",
      },
      ageRange: { min: { type: Number, default: 18 }, max: { type: Number, default: 60 } },
      maxDistance: { type: Number, default: 50, min: 0 },
      caste: [{
        type: String,
      }],
      interests: [{
        type: String,
      }]
    },
    socialLinks: [{type: String}],
    matches: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true }],
    likesSent: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true }],
    likesReceived: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    verified: { type: Boolean, default: false },
    lastActive: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    phone: {
      type: String,
      default: null,
      validate: {
        validator: (value) => !value || validator.isMobilePhone(value, "any"),
        message: "{VALUE} is not a valid phone number",
      },
      index: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
