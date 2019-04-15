import moment from 'moment';

/**
 * Create formatted date string
 * from ISO date like '2019-04-11T12:00:00.555Z'
 *
 * @param   {string} ISOString date
 *
 * @returns {string} formated date string
 */
export const getFormatedDate = (ISOString) => {
  const date = moment(ISOString);
  const currentMoment = moment();

  switch (true) {
    case (date.isSameOrAfter(currentMoment)):
      return date.format('MMM Do YYYY, HH:mm');

    case (date.isSameOrAfter(currentMoment.subtract(2, 'minute'))):
      return 'moments ago';

    case (date.isSameOrAfter(currentMoment, 'day')):
      return date.format('HH:mm');

    default:
      return date.format('MMM Do YYYY, HH:mm');
  }
}