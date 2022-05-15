import { format } from 'date-fns';
import { getDays } from '../../utils/day.util';

describe('Day util', () => {
  describe('getDays', () => {
    it('should return days with previous month days', () => {
      // given
      const month = 0;
      const year = 2020;
      const firstDayOfWeek = 0;

      // when
      const result = getDays({ month, year, firstDayOfWeek });

      // then
      expect(result[0]).toBeNull();
      expect(result[1]).toBeNull();
      expect(result[2]).toBeNull();
      expect(result[3]?.label).toBe('01');
    });

    it('should return days with label format', () => {
      // given
      const month = 0;
      const year = 2020;
      const firstDayOfWeek = 0;

      // when
      const result = getDays({
        month,
        year,
        firstDayOfWeek,
        dayLabelFormat: (date: Date) => format(date, 'dd일'),
      });

      // then
      expect(result[3]?.label).toEqual('01일');
    });
  });
});
