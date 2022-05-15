import { useState, useCallback } from 'react';
import { Month } from '../types/date.types';
import {
  getInitialActivatedMonths,
  getNewActivatedMonths,
} from '../utils/month.util';

export interface UseMonthsProps {
  monthsCount: number;
  selectedDate: Date | null;
}

export const useMonths = ({ monthsCount, selectedDate }: UseMonthsProps) => {
  const [activatedMonths, setActivatedMonths] = useState<Month[]>(
    getInitialActivatedMonths(monthsCount, selectedDate),
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
    setActivatedMonths,
    goToPreviousMonth,
    goToNextMonth,
    goToDate,
  };
};
