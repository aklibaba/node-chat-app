const moment = require('moment');
const generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new moment().valueOf()
  }
};

const generateLocationMsg = (from, lat, long) => {
return {
  from,
  url: `https://www.google.com/maps?q=${lat},${long}`,
  createdAt: new moment().valueOf()
}
};

module.exports = {generateMessage, generateLocationMsg};