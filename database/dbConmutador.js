import cron from 'node-cron';
import {dbMap, conns, userModels, tokenModels, alertModels, getDateChile, copyUsersModelAtoModelB, copyTokensModelAtoModelB, copyAlertsModelAtoModelB} from './dbModules.js';
import dbData from './dbData.js';

class dbConmutador {
  constructor(){
    this.data = dbData;
    this.inicializar();
  }
  inicializar(){
    this.data.primaria.on('connected', () => {this.usePrimaria();});
    this.data.primaria.on('disconnected', () => {this.useSecundaria();});
    this.data.secundaria.on('connected', () => {this.data.secundariaReady = true;});
    this.data.secundaria.on('disconnected', () => {this.data.secundariaReady = false; if (!this.data.primariaReady) {
      throw new Error('Any Database connected',getDateChile());}
    });  
    cron.schedule('00 * * * * *',()=>{
      if (this.data.primariaReady && this.data.secundariaReady){
        Promise.all([userModels[dbMap.secundaria].deleteMany({}),tokenModels[dbMap.secundaria].deleteMany({}),alertModels[dbMap.secundaria].deleteMany({})])
        Promise.all([copyUsersModelAtoModelB(userModels[dbMap.primaria],userModels[dbMap.secundaria]),copyTokensModelAtoModelB(tokenModels[dbMap.primaria],tokenModels[dbMap.secundaria])],copyAlertsModelAtoModelB(alertModels[dbMap.primaria],alertModels[dbMap.secundaria]));
        console.log('copy primaria to secundaria', getDateChile());
        }
    }, {
      scheduled: true,
      timezone: "America/Santiago"
    });  
  }
  usePrimaria(){
    if (this.data.secundariaReady){
      Promise.all([userModels[dbMap.primaria].deleteMany({}),tokenModels[dbMap.primaria].deleteMany({}),alertModels[dbMap.primaria].deleteMany({})])
      Promise.all([copyUsersModelAtoModelB(userModels[dbMap.secundaria],userModels[dbMap.primaria]),copyTokensModelAtoModelB(tokenModels[dbMap.secundaria],tokenModels[dbMap.primaria]),copyAlertsModelAtoModelB(alertModels[dbMap.secundaria],alertModels[dbMap.primaria])])
      console.log("copy secundaria to primaria",getDateChile());
    }
    console.log('use primaria', getDateChile());
    this.data.User = userModels[dbMap.primaria];
    this.data.Token = tokenModels[dbMap.primaria];
    this.data.Alert = alertModels[dbMap.primaria];
    
    this.data.primariaReady = true;      
  }
  useSecundaria(){
    if(!this.data.secundariaReady){
      throw new Error('Any Database connected', getDateChile());
    }else{
      console.log('use secundaria', getDateChile());
  
      this.data.User = userModels[dbMap.secundaria];
      this.data.Token = tokenModels[dbMap.secundaria];
      this.data.Alert = alertModels[dbMap.secundaria];
  
    }
    this.data.primariaReady = false;  
  }
  get User(){return this.data.User;}
  get Token(){return this.data.Token;}
  get Alert(){return this.data.Alert;}
}
export default dbConmutador;