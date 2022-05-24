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
      expect(result[0].label).toEqual('2020-01');
    });

    it('should return activated months by base date', () => {
      // given
      const base = new Date('2020/03/15');

      // when
      const result = getInitialActivatedMonths(1, base);

      // then
      const expected = new Date('2020/03/01');

      expect(result[0].date).toEqual(expected);
      expect(result[0].label).toEqual('2020-03');
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
      expect(result[1].label).toEqual('2020-02');
    });
  });

  describe('getActivatedMonths', () => {
    it('should return next activated months', () => {
      // given
      const date = new Date('2020/03/01');

      const activatedMonths: Month[] = [
        {
          date,
          label: '2020-03',
        },
      ];
      const step = 1;

      // when
      const result = getNewActivatedMonths(activatedMonths, step);

      // then
      expect(result[0].label).toBe('2020-04');
    });

    it('should return previous activated months', () => {
      // given
      const date = new Date('2020/03/01');

      const activatedMonths: Month[] = [
        {
          date,
          label: '2020-03',
        },
      ];
      const step = -1;

      // when
      const result = getNewActivatedMonths(activatedMonths, step);

      // then
      expect(result[0].label).toBe('2020-02');
    });

    it('should return previous year activated months', () => {
      // given
      const date = new Date('2020/01/01');

      const activatedMonths: Month[] = [
        {
          date,
          label: '2020-01',
        },
      ];
      const step = -1;

      // when
      const result = getNewActivatedMonths(activatedMonths, step);

      // then
      expect(result[0].label).toBe('2019-12');
    });

    it('should return next year activated months', () => {
      // given
      const date = new Date('2020/12/01');

      const activatedMonths: Month[] = [
        {
          date,
          label: '2020-12',
        },
      ];
      const step = 1;

      // when
      const result = getNewActivatedMonths(activatedMonths, step);

      // then
      expect(result[0].label).toBe('2021-01');
    });

    it('should return two activated months', () => {
      // given
      const firstMonth = new Date('2020/01/01');
      const secondMonth = new Date('2020/02/01');

      const activatedMonths: Month[] = [
        {
          date: firstMonth,
          label: '2020-01',
        },
        {
          date: secondMonth,
          label: '2020-02',
        },
      ];
      const step = 1;

      // when
      const result = getNewActivatedMonths(activatedMonths, step);

      // then
      expect(result[0].label).toBe('2020-02');
      expect(result[1].label).toBe('2020-03');
    });

    it('should return next year months', () => {
      // given
      const date = new Date('2020/01/01');

      const activatedMonths: Month[] = [
        {
          date,
          label: '2020-01',
        },
      ];
      const step = 12;

      // when
      const result = getNewActivatedMonths(activatedMonths, step);

      // then
      expect(result[0].label).toBe('2021-01');
    });

    it('should return previous year months', () => {
      // given
      const date = new Date('2020/01/01');

      const activatedMonths: Month[] = [
        {
          date,
          label: '2020-01',
        },
      ];
      const step = -12;

      // when
      const result = getNewActivatedMonths(activatedMonths, step);

      // then
      expect(result[0].label).toBe('2019-01');
    });
  });
});
