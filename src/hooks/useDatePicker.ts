import { useMemo } from 'react';
import { FirstDayOfWeek } from '../types/date.types';
import { getDays } from '../utils/day.util';
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

  return {
    activatedMonths,
    goToPreviousMonth,
    goToNextMonth,
    goToDate,
    monthDays,
  };
};
