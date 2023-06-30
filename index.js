import * as dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import usersRoute from './routes/users.route.js';
import alertsRouter from './routes/alerts.route.js';
import tokensRouter from './routes/tokens.route.js';
import DbReplicacion from './DbReplicacion.js';

var db = new DbReplicacion();

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