import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { Day, FirstDayOfWeek } from '../types/date.types';

interface GetDaysParams {
  year: number;
  month: number;
  firstDayOfWeek: FirstDayOfWeek;
  dayLabelFormat?: (date: Date) => string;
}

const getPrevMonthEmptyDays = (startDay: number, firstDayOfWeek: number) =>
  Array.from(
    Array(
      startDay >= firstDayOfWeek
        ? startDay - firstDayOfWeek
        : 6 - firstDayOfWeek + startDay + 1,
    ).keys(),
  ).map(() => null);

export const getDays = ({
  month,
  year,
  firstDayOfWeek,
  dayLabelFormat = (date: Date) => format(date, 'dd'),
}: GetDaysParams): (null | Day)[] => {
  const base = new Date(year, month);

  const start = startOfMonth(base);
  const startDay = getDay(start);
  const end = endOfMonth(base);

  const prevMonthDays = getPrevMonthEmptyDays(startDay, firstDayOfWeek);

  const currentMonthDays = eachDayOfInterval({ start, end }).map((date) => ({
    date,
    label: dayLabelFormat(date),
  }));

  return [...prevMonthDays, ...currentMonthDays];
};

export const getWeekdayLabels = (
  firstDayOfWeek: number,
  weekdayLabelFormat = (date: Date) => format(date, 'iiiiii'),
) => {
  const now = new Date();
  const weekdays = eachDayOfInterval({
    start: addDays(startOfWeek(now), firstDayOfWeek),
    end: addDays(endOfWeek(now), firstDayOfWeek),
  });

  return weekdays.map(weekdayLabelFormat);
};
