import { useMonths } from './useMonths';

export interface UseDatePickerProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  monthsCount?: number;
  unavailableDates?: Date[];
}

export const useDatePicker = ({
  selectedDate,
  onDateChange,
  minDate,
  maxDate,
  monthsCount = 1,
  unavailableDates = [],
}: UseDatePickerProps) => {
  const { activatedMonths, goToDate, goToNextMonth, goToPreviousMonth } =
    useMonths({ monthsCount, selectedDate });

  return {
    activatedMonths,
    goToPreviousMonth,
    goToNextMonth,
    goToDate,
  };
};
