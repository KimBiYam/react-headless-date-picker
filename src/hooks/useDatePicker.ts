import { useMemo } from 'react';
import { FirstDayOfWeek } from '../types/date.types';
import { getDays, getWeekdayLabels } from '../utils/day.util';
import { useMonths } from './useMonths';

export interface UseDatePickerProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  monthsCount?: number;
  firstDayOfWeek?: FirstDayOfWeek;
  unavailableDates?: Date[];
  dayLabelFormat?: (date: Date) => string;
  weekdayLabelFormat?: (date: Date) => string;
}

export const useDatePicker = ({
  selectedDate,
  onDateChange,
  minDate,
  maxDate,
  monthsCount = 1,
  firstDayOfWeek = 0,
  unavailableDates = [],
  dayLabelFormat,
  weekdayLabelFormat,
}: UseDatePickerProps) => {
  const { activatedMonths, goToDate, goToNextMonth, goToPreviousMonth } =
    useMonths({ monthsCount, selectedDate });

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

  return {
    activatedMonths,
    goToPreviousMonth,
    goToNextMonth,
    goToDate,
    monthDays,
    weekdayLabels,
  };
};
