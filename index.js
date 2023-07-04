import * as dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import usersRoute from './useCases/userCases/users.route.js';
import alertsRouter from './useCases/alertCases/alerts.route.js';
import tokensRouter from './useCases/tokenCases/tokens.route.js';
import dbConmutador from './database/dbConmutador.js';

var db = new dbConmutador();

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use((req, res, next)=>{
  req.db = db;
  next();
},usersRoute);

app.use((req, res, next)=>{
  req.db = db; 
  next();
},tokensRouter);

app.use((req, res, next)=>{
  req.db = db; 
  next();
},alertsRouter);


app.use('/users',usersRoute);
app.use('/alerts',alertsRouter);
app.use('/tokens',tokensRouter);

const port = process.env.PORT || 4001;
app.listen(port, function(){
  console.log('running server on port '+ port);
});