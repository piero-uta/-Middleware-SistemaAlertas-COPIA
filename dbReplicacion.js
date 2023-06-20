import cron from 'node-cron';
import { primaria, secundaria } from './connections.js';
import userSchema from './schemas/User.schema.js';
import tokenSchema from './schemas/Token.schema.js';
import alertSchema from './schemas/Alert.schema.js';
import getDateChile from './utils/getDateChile.js';

var UserPrimaria = primaria.model('User',userSchema);
var TokenPrimaria = primaria.model('Token', tokenSchema);
var AlertPrimaria = primaria.model('Alert', alertSchema);    
var UserSecundaria = secundaria.model('User',userSchema);
var TokenSecundaria = secundaria.model('Token', tokenSchema);
var AlertSecundaria = secundaria.model('Alert', alertSchema);    


class dbReplicacion {
  constructor(){
    this.primaria = primaria;
    this.secundaria = secundaria;
    this.User = UserPrimaria;
    this.Token = TokenPrimaria;
    this.Alert = AlertPrimaria;    
    this.primariaReady = true;
    this.secundariaReady = true;
    this.inicializar();
  }
  inicializar(){
    this.primaria.on('connected', () => {
      this.usePrimaria();
    });
    this.primaria.on('disconnected', () => {
      this.useSecundaria();
    });
    this.secundaria.on('connected', () => {
      this.secundariaReady = true;
    });
    this.secundaria.on('disconnected', () => {
      this.secundariaReady = false;
      if (!this.primariaReady) {
        throw new Error('Any Database connected',getDateChile());}
    });
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
    this.User = UserPrimaria;
    this.Token = TokenPrimaria;
    thisAlert = AlertPrimaria;    
    this.primariaReady = true;  
  }
  useSecundaria(){  
    if(!this.secundariaReady){
      throw new Error('Any Database connected', getDateChile());
    }else{
      console.log('use secundaria', getDateChile());
      this.User = UserSecundaria;
      this.Token = TokenSecundaria;
      this.Alert = AlertSecundaria;       
    }
    this.primariaReady = false;
  }
  setPrimariaReady(value){
    this.primariaReady = value;
  }
  setSecundariaReady(value){
    this.secundariaReady = value;
  }
  get models(){
    return {
      User: this.User, 
      Token: this.Token, 
      Alert: this.Alert
    }; 
  }
}
export default dbReplicacion;