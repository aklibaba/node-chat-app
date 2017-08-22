const moment = require('moment');

// const date = new Date();
// console.log(date.getMonth());

// const date = new moment();
// date.add(1, 'y').subtract(9, 'M');
// console.log(date.format('MMM Do, YYYY'));

const createdAt = 12345;
const date = new moment(createdAt);

const formDate = date.format('H:mm a');

console.log(date.valueOf());

new Date().getTime()
