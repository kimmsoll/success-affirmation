export const getFormattedDate = (
  date: string | Date,
  locale: string = 'ko-KR',
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  },
): string => {
  const newDate = date instanceof Date ? date : new Date(date);
  if (isNaN(newDate.getTime())) {
    throw new Error('Invalid date provided');
  }
  return new Intl.DateTimeFormat(locale, options).format(newDate);
};
