import express from 'express';
import mongoose from 'mongoose';

const usersRoute = express.Router();

usersRoute.get('/', async function(req,res){
  const User = req.datos.User;
  const users = await User.find({}).select('-password');
  res.json(users);
});
usersRoute.post('/one/byUsername', async function(req,res){
  const User = req.datos.User;
  const username = req.body.username;
  const user = await User.findOne({username: username});
  res.json(user);
});
usersRoute.post('/one/', async function(req,res){
  const User = req.datos.User;
  const id = new mongoose.Types.ObjectId(req.body.id);
  const user = await User.findOne({_id: id}).select('-password');
  res.json(user);
});
usersRoute.post('/byId/', async function(req,res){
  const id = req.body.id;
  const User = req.datos.User;
  const user = await User.findById(id).select('-password');
  res.json(user);
});
usersRoute.post('/save', async function(req,res){
  const User = req.datos.User;
  const {username, name, address, password} = req.body;
  const user = await User({username, name, address, password});
  user.save();
  res.json(user);
});

export default usersRoute;