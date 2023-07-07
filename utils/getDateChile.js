import moment from 'moment-timezone';

function getDateChile(){
  return moment.tz(Date.now(), "America/Santiago");
}

export default getDateChile;