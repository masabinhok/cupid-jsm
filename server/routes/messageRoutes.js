import express from 'express';
import Message from '../models/message.model.js';

const router = express.Router();


router.get('/:user1/:user2', async(req, res)=>{
  const {user1, user2} = req.params;
  const chatId = [user1, user2].sort().join('_');

  try {
    const messages = await Message.find({chatId}).sort({
      timestamp: 1
    });
    res.status(200).json({
      messages
    })
  }catch(error){
    res.status(500).json({message: error.message})
  }
})

export default router;