import { startOfMonth, addMonths, format } from 'date-fns';
import { Month } from '../types/date.types';

const getMonthByDate = (
  base: Date,
  monthLabelFormat: (date: Date) => string,
): Month => {
  const date = startOfMonth(base);

  return { date, label: monthLabelFormat(date) };
};

export const getInitialActivatedMonths = (
  monthsCount: number,
  base: Date | null,
  monthLabelFormat = (date: Date) => format(date, 'yyyy-MM'),
): Month[] => {
  const date = base ?? new Date();
  const firstMonth = getMonthByDate(date, monthLabelFormat);

  if (monthsCount <= 1) {
    return [firstMonth];
  }

  return Array.from({ length: monthsCount - 1 }, (_, i) => i + 1).reduce<
    Month[]
  >(
    (total, index) => {
      const nextMonth = addMonths(date, index);
      total.push(getMonthByDate(nextMonth, monthLabelFormat));

      return total;
    },
    [firstMonth],
  );
};

export const getNewActivatedMonths = (
  activatedMonths: Month[],
  step: number,
  monthLabelFormat = (date: Date) => format(date, 'yyyy-MM'),
): Month[] =>
  activatedMonths.map((month) =>
    getMonthByDate(addMonths(month.date, step), monthLabelFormat),
  );
