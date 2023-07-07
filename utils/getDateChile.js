import moment from 'moment-timezone';

/**
 * @function getDateChile
 * @description Función que permite obtener la fecha según la zona horaria de Chile (tipo Date)
 * @returns {moment} - Retorna la fecha y hora de Chile
 */
function getDateChile(){
  return moment.tz(Date.now(), "America/Santiago");
}

export default getDateChile;