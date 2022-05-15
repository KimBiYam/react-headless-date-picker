import { useState, useCallback, useMemo } from 'react';
import { FirstDayOfWeek, Month } from '../types/date.types';
import { getDays, getWeekdayLabels } from '../utils/day.util';
import {
  getInitialActivatedMonths,
  getNewActivatedMonths,
} from '../utils/month.util';

export interface UseMonthsProps {
  monthsCount: number;
  selectedDate: Date | null;
  dayLabelFormat?: (date: Date) => string;
  weekdayLabelFormat?: (date: Date) => string;
  firstDayOfWeek: FirstDayOfWeek;
}

export const useMonths = ({
  monthsCount,
  selectedDate,
  dayLabelFormat,
  weekdayLabelFormat,
  firstDayOfWeek,
}: UseMonthsProps) => {
  const [activatedMonths, setActivatedMonths] = useState<Month[]>(
    getInitialActivatedMonths(monthsCount, selectedDate),
  );

  const monthDays = useMemo(
    () =>
      activatedMonths.map(({ month, year }) =>
        getDays({ month, year, dayLabelFormat, firstDayOfWeek }),
      ),
    [activatedMonths],
  );

  const weekdayLabels = useMemo(
    () => getWeekdayLabels(firstDayOfWeek, weekdayLabelFormat),
    [firstDayOfWeek, weekdayLabelFormat],
  );

  const goToPreviousMonth = useCallback(() => {
    setActivatedMonths(getNewActivatedMonths(activatedMonths, -1));
  }, [activatedMonths, setActivatedMonths]);

  const goToNextMonth = useCallback(() => {
    setActivatedMonths(getNewActivatedMonths(activatedMonths, 1));
  }, [activatedMonths, setActivatedMonths]);

  const goToDate = useCallback(
    (date: Date) => {
      setActivatedMonths(getInitialActivatedMonths(monthsCount, date));
    },
    [setActivatedMonths, monthsCount],
  );

  return {
    activatedMonths,
    monthDays,
    weekdayLabels,
    setActivatedMonths,
    goToPreviousMonth,
    goToNextMonth,
    goToDate,
  };
};
