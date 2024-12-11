import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String, default: null },
    lastName: { type: String, required: true },
    email: {
    type: String,
    required: true,
    unique: true,
    validate: {
     validator: validator.isEmail,
     message: '{VALUE} is not a valid email',
    }
    },
    secret: {
      type: String,
      default : null,
    },
    otpGeneratedAt: {
      type: Date,
      default: null
    },
    phone: { type: String, unique: true }, 
    gender: { type: String, enum: ['Male', 'Female', 'Non-binary', 'Other'], required: true },
    dateOfBirth: { type: Date, required: true },
    profilePicture: { type: String, default: 'default.jpg' },
    bio: { type: String, maxlength: 500 },
    interests: [{ type: String }], // Hobbies or activities they enjoy
    location: {
        city: { type: String },
        country: { type: String },
        coordinates: {
            type: { type: String, enum: ['Point'], default: 'Point' },
            coordinates: { type: [Number], index: '2dsphere' }, // [longitude, latitude]
        },
    },
    preference: {
        gender: { type: String, enum: ['Male', 'Female', 'Non-binary', 'Everyone'], default: 'Everyone' },
        ageRange: {
            min: { type: Number, default: 18 },
            max: { type: Number, default: 60 },
        },
        distance: { type: Number, default: 50 }, // Max distance in kilometers
    },
    socialLinks: {
        facebook: { type: String },
        instagram: { type: String },
        twitter: { type: String },
    },
    matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // List of matched user IDs
    likesSent: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // List of user IDs liked
    likesReceived: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users who liked this user
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }], // References to a message schema
    verified: { type: Boolean, default: false },
    lastActive: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });






const User = mongoose.model('User', userSchema)

export default User;