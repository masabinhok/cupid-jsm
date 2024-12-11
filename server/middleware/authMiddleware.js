import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const tokenBlacklist = new Set();

export const verifyToken = (req, res, next)=>{
  const token = req.headers.authorization.split(' ')[1];
  if(!token || tokenBlacklist.has(token)) {
    return res.status(401).json({message: 'Unauthorized'});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  }
  catch{
    res.status(401).json({message: 'Invalid token.'});  
  }
}

export const logoutToken = (token)=>{
  tokenBlacklist.add(token);
}