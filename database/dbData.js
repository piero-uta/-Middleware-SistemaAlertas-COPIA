import { dbMap, conns, userModels, tokenModels, alertModels, getDateChile } from "./dbModules.js";

class dbData {
  constructor () {
    this.primaria = conns[dbMap.primaria];
    this.secundaria = conns[dbMap.secundaria];
    this.primariaReady = true;
    this.secundariaReady = true;
    this.User = userModels[dbMap.primaria];
    this.Token = tokenModels[dbMap.primaria];
    this.Alert = alertModels[dbMap.primaria];  
    this.planificadorCopias();
  }
  planificadorCopias() {
    cron.schedule('00 * * * * *',()=>{
      if (this.primariaReady && this.secundariaReady){
        Promise.all([userModels[dbMap.secundaria].deleteMany({}),tokenModels[dbMap.secundaria].deleteMany({}),alertModels[dbMap.secundaria].deleteMany({})])
        Promise.all([copyUsersModelAtoModelB(userModels[dbMap.primaria],userModels[dbMap.secundaria]),copyTokensModelAtoModelB(tokenModels[dbMap.primaria],tokenModels[dbMap.secundaria])],copyAlertsModelAtoModelB(alertModels[dbMap.primaria],alertModels[dbMap.secundaria]));
        console.log('copy primaria to secundaria', getDateChile());
        }
    }, {
      scheduled: true,
      timezone: "America/Santiago"
    });  
  }
  useModels(dbMapModel) {
    console.log(`use models ${dbMapModel}`, getDateChile());
    this.User = userModels[dbMapModel];
    this.Token = tokenModels[dbMapModel];
    this.Alert = alertModels[dbMapModel];
  }

  verifyDbsReady () {
    if (!this.primariaReady && !this.secundariaReady) {
      throw new Error('Any Database connected',getDateChile());
    }
  }
}

export default dbData;