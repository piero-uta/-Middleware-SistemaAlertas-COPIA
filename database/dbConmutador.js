import cron from 'node-cron';
import {dbMap, conns, userModels, tokenModels, alertModels, getDateChile, copyUsersModelAtoModelB, copyTokensModelAtoModelB, copyAlertsModelAtoModelB} from './dbModules.js';
import dbData from './dbData.js';

class dbConmutador {
  constructor(){
    this.data = new dbData();
    this.inicializar();
  }
  inicializar(){
    this.data.primaria.on('connected', () => {this.usePrimaria();});
    this.data.primaria.on('disconnected', () => {this.useSecundaria();});
    this.data.secundaria.on('connected', () => {this.data.secundariaReady = true;});
    this.data.secundaria.on('disconnected', () => {this.data.secundariaReady = false; this.data.verifyDbsReady();});  
  }
  usePrimaria(){
    if (this.data.secundariaReady){
      Promise.all([userModels[dbMap.primaria].deleteMany({}),tokenModels[dbMap.primaria].deleteMany({}),alertModels[dbMap.primaria].deleteMany({})])
      Promise.all([copyUsersModelAtoModelB(userModels[dbMap.secundaria],userModels[dbMap.primaria]),copyTokensModelAtoModelB(tokenModels[dbMap.secundaria],tokenModels[dbMap.primaria]),copyAlertsModelAtoModelB(alertModels[dbMap.secundaria],alertModels[dbMap.primaria])])
      console.log("copy secundaria to primaria",getDateChile());
    }
    this.data.useModelsPrimaria(dbMap.primaria);    
    this.data.primariaReady = true;      
  }
  useSecundaria(){
    this.data.verifyDbsReady();
    this.data.useModelsSecundaria(dbMap.secundaria);  
    this.data.primariaReady = false;  
  }
  get User(){return this.data.User;}
  get Token(){return this.data.Token;}
  get Alert(){return this.data.Alert;}
}
export default dbConmutador;