import { Month } from '../../types/date.types';
import {
  getNewActivatedMonths,
  getInitialActivatedMonths,
} from '../../utils/month.util';

describe('Month util', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  describe('getInitialActivatedMonths', () => {
    it('should return activated months by current date when base argument is null', () => {
      // given
      const systemDate = new Date('2020/01/01');

      jest.useFakeTimers();
      jest.setSystemTime(systemDate);

      // when
      const result = getInitialActivatedMonths(1, null);

      // then
      expect(result[0].date).toEqual(systemDate);
      expect(result[0].month).toEqual(systemDate.getMonth());
      expect(result[0].year).toEqual(systemDate.getFullYear());
    });

    it('should return activated months by base date', () => {
      // given
      const base = new Date('2022/03/15');

      // when
      const result = getInitialActivatedMonths(1, base);

      // then
      const expected = new Date('2022/03/01');

      expect(result[0].date).toEqual(expected);
      expect(result[0].month).toEqual(base.getMonth());
      expect(result[0].year).toEqual(base.getFullYear());
    });

    it('should return activated months by numberOfMonths argument', () => {
      // given
      const systemDate = new Date('2020/01/01');
      const numberOfMonths = 2;

      jest.useFakeTimers();
      jest.setSystemTime(systemDate);

      // when
      const result = getInitialActivatedMonths(numberOfMonths, null);

      // then
      expect(result.length).toBe(2);
      expect(result[1].month).toBe(systemDate.getMonth() + 1);
    });
  });

  describe('getActivatedMonths', () => {
    it('should return next activated months', () => {
      // given
      const date = new Date('2020/03/01');

      const activatedMonths: Month[] = [
        {
          date,
          month: date.getMonth(),
          year: date.getFullYear(),
        },
      ];
      const step = 1;

      // when
      const result = getNewActivatedMonths(activatedMonths, step);

      // then
      expect(result[0].month).toBe(date.getMonth() + 1);
      expect(result[0].year).toBe(date.getFullYear());
    });

    it('should return previous activated months', () => {
      // given
      const date = new Date('2020/03/01');

      const activatedMonths: Month[] = [
        {
          date,
          month: date.getMonth(),
          year: date.getFullYear(),
        },
      ];
      const step = -1;

      // when
      const result = getNewActivatedMonths(activatedMonths, step);

      // then
      expect(result[0].month).toBe(date.getMonth() - 1);
      expect(result[0].year).toBe(date.getFullYear());
    });

    it('should return previous year activated months', () => {
      // given
      const date = new Date('2020/01/01');

      const activatedMonths: Month[] = [
        {
          date,
          month: date.getMonth(),
          year: date.getFullYear(),
        },
      ];
      const step = -1;

      // when
      const result = getNewActivatedMonths(activatedMonths, step);

      // then
      expect(result[0].month).toBe(11);
      expect(result[0].year).toBe(2019);
    });

    it('should return next year activated months', () => {
      // given
      const date = new Date('2020/12/01');

      const activatedMonths: Month[] = [
        {
          date,
          month: date.getMonth(),
          year: date.getFullYear(),
        },
      ];
      const step = 1;

      // when
      const result = getNewActivatedMonths(activatedMonths, step);

      // then
      expect(result[0].month).toBe(0);
      expect(result[0].year).toBe(2021);
    });

    it('should return two activated months', () => {
      // given
      const firstMonth = new Date('2020/01/01');
      const secondMonth = new Date('2020/02/01');

      const activatedMonths: Month[] = [
        {
          date: firstMonth,
          month: firstMonth.getMonth(),
          year: firstMonth.getFullYear(),
        },
        {
          date: secondMonth,
          month: secondMonth.getMonth(),
          year: secondMonth.getFullYear(),
        },
      ];
      const step = 1;

      // when
      const result = getNewActivatedMonths(activatedMonths, step);

      // then
      expect(result[0].month).toBe(firstMonth.getMonth() + 1);
      expect(result[0].year).toBe(firstMonth.getFullYear());
      expect(result[1].month).toBe(firstMonth.getMonth() + 2);
      expect(result[1].year).toBe(firstMonth.getFullYear());
    });

    it('should return next year months', () => {
      // given
      const date = new Date('2020/01/01');

      const activatedMonths: Month[] = [
        {
          date,
          month: date.getMonth(),
          year: date.getFullYear(),
        },
      ];
      const step = 12;

      // when
      const result = getNewActivatedMonths(activatedMonths, step);

      // then
      expect(result[0].month).toBe(0);
      expect(result[0].year).toBe(2021);
    });

    it('should return previous year months', () => {
      // given
      const date = new Date('2020/01/01');

      const activatedMonths: Month[] = [
        {
          date,
          month: date.getMonth(),
          year: date.getFullYear(),
        },
      ];
      const step = -12;

      // when
      const result = getNewActivatedMonths(activatedMonths, step);

      // then
      expect(result[0].month).toBe(0);
      expect(result[0].year).toBe(2019);
    });
  });
});
