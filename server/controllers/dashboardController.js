import User from "../models/auth.model.js"

export const getAllUsers = async (req, res)=>{
  
  try {
    const user = req.user;
  console.log('User:', user);
  const currentUser = await User.findOne({
    _id: user.id
  });
  console.log('Current User:', currentUser);
  if(!currentUser){
    return res.status(404).json({error: 'User not found'});
  }
  const preferedGender = currentUser.preference.gender;
  console.log('Preference:', preferedGender);
    const users = await User.find({
      gender: preferedGender,
    });
    console.log('Users:', users);
    res.status(200).json({
      users,
    });
  }
  catch(error){
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}