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