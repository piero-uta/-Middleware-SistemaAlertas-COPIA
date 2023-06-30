import express from 'express';
const tokensRouter = express.Router();


tokensRouter.get('/', async function(req,res){
  const db = req.db;
  res.json(await db.getTokens());
});
tokensRouter.get('/one/:token', async function(req,res){
  const db = req.db;
  res.json(await db.getOneToken(req.params.token));  
});
tokensRouter.post('/save', async function(req,res){
  const db = req.db;
  const token = req.body.token;
  res.json(await db.saveToken(token));
});

export default tokensRouter;