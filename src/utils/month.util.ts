import { startOfMonth, getMonth, getYear, addMonths } from 'date-fns';
import { Month } from '../types/date.types';

const getMonthByDate = (base: Date): Month => {
  const date = startOfMonth(base);

  return { date, month: getMonth(date), year: getYear(date) };
};

export const getInitialActiveMonths = (
  monthsCount: number,
  base: Date | null,
): Month[] => {
  const date = base ?? new Date();
  const firstMonth = getMonthByDate(date);

  if (monthsCount <= 1) {
    return [firstMonth];
  }

  const result = Array.from(
    { length: monthsCount - 1 },
    (_, i) => i + 1,
  ).reduce<Month[]>(
    (total, index) => {
      const nextMonth = addMonths(date, index);
      total.push(getMonthByDate(nextMonth));

      return total;
    },
    [firstMonth],
  );

  return result;
};
