import User from "../models/auth.model.js"

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
    console.log(userId);
    if(!userId){
      return res.status(400).json({error: 'User ID is required'});
    }
    const user = await User.findOne({
      _id: userId,
    })
    console.log(user);
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