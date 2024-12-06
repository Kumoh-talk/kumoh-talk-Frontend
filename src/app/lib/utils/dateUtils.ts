import dayjs from 'dayjs';

const getDateForWeekday = (targetWeekday: number, format = 'YYYY.MM.DD') => {
  const today = dayjs();
  const todayWeekday = today.day();
  const offset = (targetWeekday - todayWeekday + 7) % 7;

  return today.add(offset, 'day').format(format);
};

const getUpcomingWeekdayDates = (
  targetWeekday: number,
  weeks: number,
  format = 'YYYY.MM.DD'
) => {
  const result = [];

  const baseDate = dayjs(getDateForWeekday(targetWeekday));

  for (let i = 0; i < weeks; i++) {
    const date = baseDate.add(i * 7, 'day');
    result.push(date.format(format));
  }

  return result;
};

export { getUpcomingWeekdayDates };
