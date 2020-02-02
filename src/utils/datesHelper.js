const moment = require('moment');

const unixToMysqlDate = (input) => {
  let givenDate = input;
  let date;
  if (givenDate === '0') givenDate = '1483228799000';
  date = new Date(Number(givenDate));
  date = `${date.getUTCFullYear()}-${
    (`00${date.getUTCMonth() + 1}`).slice(-2)}-${
    (`00${date.getUTCDate()}`).slice(-2)} ${
    (`00${date.getUTCHours()}`).slice(-2)}:${
    (`00${date.getUTCMinutes()}`).slice(-2)}:${
    (`00${date.getUTCSeconds()}`).slice(-2)}`;
  return date;
};

const monthDiff = (d1, d2) => {
  console.log(d2, d1);
  const [yyyy1, mm1, dd1] = d1.split('-');
  const [yyyy2, mm2, dd2] = d2.split('-');
  const month = Math.ceil(moment([yyyy2, (mm2 - 1), dd2]).diff(moment([yyyy1, (mm1 - 1), dd1]), 'months', true));
  console.log(month);
  return month;
};

const format = {
  date: 'DD/MM/YYYY',
  timeStamp: 'DD-MM-YYYY hh:mm:ss',
  time: 'hh:mm:ss'
};

const addMonthToDate = (date, month) => moment(date, 'DD/MM/YYYY').add(month, 'months').format('DD/MM/YYYY');

// Current Timestamp
const unixTimestamp = () => moment().unix();

// Convert date to timestamp
const dateToUnix = input => moment(input, format.timeStamp).unix();

// Convert to full date
const unixToFullDate = input => moment(moment.unix(input)).utcOffset('+05:30').format(format.date);

// Convert Date in time and second format for CRIF data
const unixToFullDate1 = input => moment(moment.unix(input)).utcOffset('+05:30').format(format.timeStamp);

// Convert to date
const unixToDate = input => moment(moment.unix(input)).utcOffset('+05:30').format(format.date);

// Convert to time
const unixToTime = input => moment(moment.unix(input)).utcOffset('+05:30').format(format.time);

// Add minutes to timestamp
const addToTimestamp = input => unixTimestamp() + input * 60;

// Difference in sec
const diff = (low, high) => moment(high).diff(low);

const docPrefix = () => moment().format('YYYY_MMM_DD_');

module.exports = {
  unixToMysqlDate,
  unixTimestamp,
  addMonthToDate,
  dateToUnix,
  unixToFullDate,
  unixToFullDate1,
  unixToDate,
  monthDiff,
  unixToTime,
  addToTimestamp,
  diff,
  docPrefix
};
