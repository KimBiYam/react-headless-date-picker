import { useCallback } from 'react';
import { FirstDayOfWeek } from '../types/date.types';
import { isDisabled } from '../utils/day.util';
import { useMonths } from './useMonths';

export type DatePickerFocus = 'date' | null;

export type DatePickerState = { date: Date | null; focus?: DatePickerFocus };

export interface UseDatePickerProps {
  selectedDate: Date | null;
  focus: DatePickerFocus;
  onDateChange: (state: DatePickerState) => void;
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
  focus,
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
    (date: Date) => {
      onDateChange({ date, focus: null });
    },
    [onDateChange],
  );

  const isDisabledDate = useCallback(
    (date: Date) => isDisabled({ date, unavailableDates, maxDate, minDate }),
    [unavailableDates, maxDate, minDate],
  );

  return {
    focus,
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
