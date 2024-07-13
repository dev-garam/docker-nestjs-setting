import * as moment from 'moment';

export const timestamp = () => new Date().getTime();

export const TIME_FORMAT = 'HH:mm:ss';
export const DATE_FORMAT = `YYYY-MM-DD`;
export const DATETIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}`;

export const now = (date = new Date()) => date;

export const getDateFormat = (
  date?: Date | moment.Moment,
  dateFormat: string = DATETIME_FORMAT,
) => moment(date || now()).format(dateFormat);

export const dateCalc = (
  date: Date,
  amount: number,
  unit: moment.unitOfTime.DurationConstructor = 'minute',
) => {
  return moment(date).add(amount, unit);
};
