import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
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
  } 
},{
  timestamps: true
})


const User = mongoose.model('User', userSchema)

export default User;