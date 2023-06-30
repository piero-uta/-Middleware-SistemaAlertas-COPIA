import express from 'express';
import mongoose from 'mongoose';

const usersRoute = express.Router();

usersRoute.get('/', async function(req,res){
  const db = req.db;
  res.json(await db.getUsers());
});
usersRoute.post('/one/byUsername', async function(req,res){
  const db = req.db;
  const username = req.body.username;
  res.json(await db.getOneUserByUsername(username));
});
usersRoute.post('/one/', async function(req,res){
  const db = req.db;
  const id = new mongoose.Types.ObjectId(req.body.id);
  res.json(await db.getOneUser(id));
});
usersRoute.post('/byId/', async function(req,res){
  const id = req.body.id;
  const db = req.db;
  res.json(await db.getOneUserById(id));
});
usersRoute.post('/save', async function(req,res){
  const db = req.db;
  const {username, name, address, password} = req.body;
  res.json(await db.saveUser(username, name, address, password));
});

export default usersRoute;