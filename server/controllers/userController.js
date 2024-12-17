import User from "../models/auth.model.js"
import logger from "../utils/logger.js";

export const getAllUsers = async (req, res)=>{
   try {
    const user = req.user;
  const currentUser = await User.findOne({
    _id: user.id
  });

  if(!currentUser){
    return res.status(404).json({error: 'User not found'});
  }
  const preferedGender = currentUser.preference.gender;

    const users = await User.find({
      gender: preferedGender,
    });

    res.status(200).json({
      users,
    });
  }
  catch(error){
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}

export const getUserProfile = async (req, res)=>{
  try {
    const userId = req.params.id;
   
    if(!userId){
      return res.status(400).json({error: 'User ID is required'});
    }
    const user = await User.findOne({
      _id: userId,
    })
 
    if(!user){
      return res.status(404).json({error: 'User not found'});
    }
    res.status(200).json({
      user,
    });
  }catch(error){
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}

export const toggleLike = async (req, res)=>{
  try {
    const userId = req.user.id;
    const likedUserId = req.params.id;

    if(!likedUserId){
      return res.status(400).json({error: 'User ID is required'});
    }
    const user = await User.findOne({
      _id: userId,
    })
    const likedUser = await User.findOne({
      _id: likedUserId,
    })
    if(!user){
      return res.status(404).json({error: 'User not found'});
    }
    if(!likedUser){
      return res.status(404).json({error: 'Liked User not found'});
    }
    user.likesSent.includes(likedUserId) ? user.likesSent.pull(likedUserId) : user.likesSent.push(likedUserId);
    await user.save();  
    likedUser.likesReceived.includes(userId) ? likedUser.likesReceived.pull(userId) : likedUser.likesReceived.push(userId);
    await likedUser.save();
    res.status(200).json({
      message: 'Like toggled successfully',
    })
  }catch(error){
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}

export const updateUserProfile  = async (req, res)=>{
  const userId = req.user.id;
  const { 
    firstName, 
    lastName, 
    dateOfBirth, 
    gender, 
    middleName, 
    profilePicture, 
    phone, 
    bio, 
    interests, 
    location, 
    preference,
    socialLinks 
  } = req.body;
  try {
    // Find the user by email and update their information
    const newUser = await User.findOneAndUpdate(
      {_id: userId},
      {
        firstName,
        lastName,
        middleName,
        gender,
        dateOfBirth,
        profilePicture,
        bio,
        interests,
        location: {
          city: location.city,
          country: location.country,
        },
        preference: {
          gender: preference.gender,
          ageRange: {
            min: preference.ageRange.min,
            max: preference.ageRange.max
          },
          maxDistance: preference.maxDistance,
          interests: preference.interests
        },
        socialLinks,
        phone
      },
      { new: true }
    );

    // Return success response
    res.status(200).json({ message: 'User info saved successfully.', user: newUser });
  } catch (error) {
    // Log error and return failure response
    logger.error(`Error in saveUserInfo: ${error.message}`);
    res.status(500).json({ message: 'Error saving user info. Please try again later.', error: error.message });
  }
};