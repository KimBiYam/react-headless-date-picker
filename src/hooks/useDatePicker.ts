import { useCallback } from 'react';
import { FirstDayOfWeek } from '../types/date.types';
import { isDisabled } from '../utils/day.util';
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
  const {
    activatedMonths,
    goToDate,
    goToNextMonth,
    goToPreviousMonth,
    monthDays,
    weekdayLabels,
  } = useMonths({
    monthsCount,
    selectedDate,
    firstDayOfWeek,
    dayLabelFormat,
    weekdayLabelFormat,
  });

  const onDayClick = useCallback(
    (date: Date) => onDateChange(date),
    [onDateChange],
  );

  const isDisabledDate = useCallback(
    (date: Date) => isDisabled({ date, unavailableDates, maxDate, minDate }),
    [unavailableDates, maxDate, minDate],
  );

  return {
    activatedMonths,
    goToPreviousMonth,
    goToNextMonth,
    goToDate,
    monthDays,
    weekdayLabels,
    onDayClick,
    isDisabledDate,
  };
};
