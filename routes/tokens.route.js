import express from 'express';
import mongoose from 'mongoose';
const tokensRouter = express.Router();


tokensRouter.get('/', async function(req,res){
  const Token = req.datos.Token;
  const tokens = await Token.find({});
  res.json(tokens);
});
tokensRouter.get('/one/:token', async function(req,res){
  const Token = req.datos.Token;
  const token = await Token.findOne({token: req.params.token});
  res.json(token);  
});
tokensRouter.post('/save', async function(req,res){
  const Token = req.datos.Token;
  const token = req.body.token;
  const myToken = new Token({token});
  await myToken.save();  
  res.json(myToken);
});

export default tokensRouter;