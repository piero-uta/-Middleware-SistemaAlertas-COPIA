import mongoose from "mongoose";
import cron from 'node-cron';
import getDateChile from './utils/getDateChile.js';
import * as dotenv from 'dotenv';
import userSchema from './useCases/userCases/User.schema.js';
import tokenSchema from './useCases/tokenCases/Token.schema.js';
import alertSchema from './useCases/alertCases/Alert.schema.js';


dotenv.config();

var primaria
var secundaria
try {
  primaria = await mongoose.createConnection(process.env.MONGODB, { useNewUrlParser: true }).asPromise();
} catch (err) {
  console.error("Error en la conexión a la base de datos primaria:", err);
}
try {
  secundaria = await mongoose.createConnection(process.env.MONGODB2, { useNewUrlParser: true }).asPromise();
} catch (err) {
  console.error("Error en la conexión a la base de datos secundaria:", err);
  // secundaria = primaria;
}    

var userPrimaria = primaria.model('User',userSchema);
var tokenPrimaria = primaria.model('Token', tokenSchema);
var alertPrimaria = primaria.model('Alert', alertSchema);        
var userSecundaria = secundaria.model('User',userSchema);
var tokenSecundaria = secundaria.model('Token', tokenSchema);
var alertSecundaria = secundaria.model('Alert', alertSchema);        


class DbReplicacion {
  constructor(){


    this.primaria = primaria;
    this.secundaria = secundaria;
    this.User = userPrimaria;
    this.Token = tokenPrimaria;
    this.Alert = alertPrimaria;
    this.primariaReady = true;
    this.secundariaReady = true;
    this.inicializar();
  }
  inicializar(){

    this.primaria.on('connected', () => {this.usePrimaria();});
    this.primaria.on('disconnected', () => {this.useSecundaria();});
    this.secundaria.on('connected', () => {this.secundariaReady = true;});
    this.secundaria.on('disconnected', () => {this.secundariaReady = false; if (!this.primariaReady) {throw new Error('Any Database connected',getDateChile());}});
    
    cron.schedule('00 * * * * *',()=>{
      if (this.primariaReady && this.secundariaReady){
        // Promise.all([UserSecundaria.deleteMany({}),TokenSecundaria.deleteMany({}),AlertSecundaria.deleteMany({})])
        // Promise.all([copyUsersModelAtoModelB(UserPrimaria,UserSecundaria),copyTokensModelAtoModelB(TokenPrimaria,TokenSecundaria)],copyAlertsModelAtoModelB(AlertPrimaria,AlertSecundaria));
        console.log('copy primaria to secundaria', getDateChile());
        }
    }, {
      scheduled: true,
      timezone: "America/Santiago"
    });
  }
  usePrimaria(){
    if (this.secundariaReady){
      // Promise.all([UserPrimaria.deleteMany({}),TokenPrimaria.deleteMany({}),AlertPrimaria.deleteMany({})])
      // Promise.all([copyUsersModelAtoModelB(UserSecundaria,UserPrimaria),copyTokensModelAtoModelB(TokenSecundaria,TokenPrimaria),copyAlertsModelAtoModelB(TokenSecundaria,TokenPrimaria)])
      console.log("copy secundaria to primaria",getDateChile());
    }
    console.log('use primaria', getDateChile());
    this.User = userPrimaria;
    this.Token = tokenPrimaria;
    this.Alert = alertPrimaria;
    this.primariaReady = true;  
  }
  useSecundaria(){  
    if(!this.secundariaReady){
      throw new Error('Any Database connected', getDateChile());
    }else{
      console.log('use secundaria', getDateChile());
      this.User = userSecundaria;
      this.Token = tokenSecundaria;
      this.Alert = alertSecundaria;  
    }
    this.primariaReady = false;
  }
  setPrimariaReady(value){
    this.primariaReady = value;
  }
  setSecundariaReady(value){
    this.secundariaReady = value;
  }
}
export default DbReplicacion;