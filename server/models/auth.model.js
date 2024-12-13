import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  middleName: { type: String, default: null },
  lastName: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email',
    },
  },
  secret: { type: String, default: null },
  otpGeneratedAt: { type: Date, default: null },
  gender: { type: String, enum: ['Male', 'Female', 'Non-binary', 'Other'] },
  dateOfBirth: {
    type: Date,
    validate: {
      validator: (value) => {
        const age = new Date().getFullYear() - value.getFullYear();
        return age >= 18;
      },
      message: 'User must be at least 18 years old',
    },
  },

  profilePicture: { type: String, default: 'default.jpg' },
  bio: { type: String, maxlength: 500 },
  interests: [{ type: String }],
  location: {
    city: { type: String },
    country: { type: String },
    coordinates: {
      type: { type: String, enum: ['Point'], required: true },
      coordinates: { type: [Number], required: true },
    },
  },
  preference: {
    gender: { type: String, enum: ['Male', 'Female', 'Non-binary', 'Everyone'], default: 'Everyone' },
    ageRange: { min: { type: Number, default: 18 }, max: { type: Number, default: 60 } },
  preference: {
  distance: { type: Number, default: 50, min: 0 },
},

  },
  socialLinks: {
    facebook: { type: String },
    instagram: { type: String },
    twitter: { type: String },
  },
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  likesSent: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  likesReceived: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  verified: { type: Boolean, default: false },
  lastActive: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  phone: {
  type: String,
  default: null,
  validate: {
    validator: (value) => validator.isMobilePhone(value, 'any'),
    message: '{VALUE} is not a valid phone number',
  },
}, 
}, { timestamps: true });



const User = mongoose.model('User', userSchema);

export default User;
