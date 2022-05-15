import { getInitialActiveMonths } from '../../utils/month.util';

describe('Month util', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  describe('getInitialActiveMonths', () => {
    it('should return active months by current date when base argument is null', () => {
      // given
      const systemDate = new Date('2020/01/01');

      jest.useFakeTimers();
      jest.setSystemTime(systemDate);

      // when
      const result = getInitialActiveMonths(1, null);

      // then
      expect(result[0].date).toEqual(systemDate);
      expect(result[0].month).toEqual(systemDate.getMonth());
      expect(result[0].year).toEqual(systemDate.getFullYear());
    });

    it('should return active months by base date', () => {
      // given
      const base = new Date('2022/03/15');

      // when
      const result = getInitialActiveMonths(1, base);

      // then
      const expected = new Date('2022/03/01');

      expect(result[0].date).toEqual(expected);
      expect(result[0].month).toEqual(base.getMonth());
      expect(result[0].year).toEqual(base.getFullYear());
    });

    it('should return active months by numberOfMonths argument', () => {
      // given
      const systemDate = new Date('2020/01/01');
      const numberOfMonths = 2;

      jest.useFakeTimers();
      jest.setSystemTime(systemDate);

      // when
      const result = getInitialActiveMonths(numberOfMonths, null);

      // then
      expect(result.length).toBe(2);
      expect(result[1].month).toBe(systemDate.getMonth() + 1);
    });
  });
});
