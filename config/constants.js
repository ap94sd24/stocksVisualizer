const DAILY_ADJUSTED = 'TIME_SERIES_DAILY_ADJUSTED';
const WEEKLY_ADJUSTED = 'TIME_SERIES_WEEKLY_ADJUSTED';
const MONTHLY_ADJUSTED = 'TIME_SERIES_MONTHLY_ADJUSTED';

const timePeriod = (type) => {
  switch (type) {
    case 'daily':
      return DAILY_ADJUSTED;
    case 'weekly':
      return WEEKLY_ADJUSTED;
    case 'monthly':
      return MONTHLY_ADJUSTED;
    default:
      break;
  }
};

module.exports = timePeriod;
