import { act, renderHook } from '@testing-library/react-hooks';
import { useMonths, UseMonthsProps } from '../../hooks/useMonths';
import { Month } from '../../types/date.types';

describe('useMonths', () => {
  const setup = ({
    selectedDate = null,
    monthsCount = 1,
    firstDayOfWeek = 0,
  }: Partial<UseMonthsProps>) =>
    renderHook(() =>
      useMonths({
        selectedDate,
        monthsCount,
        firstDayOfWeek,
      }),
    );

  describe('initialState', () => {
    it('should return initial activatedMonths by current date', () => {
      // given
      const systemDate = new Date('2020/01/01');

      jest.useFakeTimers();
      jest.setSystemTime(systemDate);

      const { result } = setup({});

      // then
      const expected: Month = {
        date: systemDate,
        label: '2020-01',
      };

      expect(result.current.activatedMonths).toEqual([expected]);
    });

    it('should return initial activatedMonths by selectedDate', () => {
      // given
      const selectedDate = new Date('2020/01/01');

      const { result } = setup({ selectedDate });

      // then
      const expected: Month = { date: selectedDate, label: '2020-01' };

      expect(result.current.activatedMonths).toEqual([expected]);
    });
  });

  describe('goToPreviousMonth', () => {
    it('should change active months to previous months', () => {
      // given
      const selectedDate = new Date('2020/02/01');

      const { result } = setup({ selectedDate });

      // when
      act(result.current.goToPreviousMonth);

      // then
      expect(result.current.activatedMonths[0].label).toBe('2020-01');
    });

    it('should change active months to previous year months', () => {
      // given
      const selectedDate = new Date('2020/01/01');

      const { result } = setup({ selectedDate });

      // when
      act(result.current.goToPreviousMonth);

      // then
      expect(result.current.activatedMonths[0].label).toBe('2019-12');
    });
  });

  describe('goToNextMonth', () => {
    it('should change active months to next months', () => {
      // given
      const selectedDate = new Date('2020/02/01');

      const { result } = setup({ selectedDate });

      // when
      act(result.current.goToNextMonth);

      // then
      expect(result.current.activatedMonths[0].label).toBe('2020-03');
    });

    it('should change active months to next year months', () => {
      // given
      const selectedDate = new Date('2020/12/01');

      const { result } = setup({ selectedDate });

      // when
      act(result.current.goToNextMonth);

      // then
      expect(result.current.activatedMonths[0].label).toBe('2021-01');
    });
  });
});
