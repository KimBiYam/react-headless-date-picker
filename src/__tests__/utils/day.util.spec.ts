import { format } from 'date-fns';
import { getDays, getWeekdayLabels } from '../../utils/day.util';

describe('Day util', () => {
  describe('getDays', () => {
    it('should return days with previous month empty days', () => {
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

  describe('getWeekdayLabels', () => {
    it('should return weekday labels', () => {
      // given
      const firstDayOfWeek = 0;

      // when
      const result = getWeekdayLabels(firstDayOfWeek);

      // then
      const expected = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
      expect(result).toEqual(expected);
    });

    it('should return weekday labels by firstDayOfWeek', () => {
      // given
      const firstDayOfWeek = 2;

      // when
      const result = getWeekdayLabels(firstDayOfWeek);

      // then
      const expected = ['Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo'];
      expect(result).toEqual(expected);
    });

    it('should return weekday labels with weekday format', () => {
      // given
      const firstDayOfWeek = 0;

      // when
      const result = getWeekdayLabels(firstDayOfWeek, (date: Date) =>
        format(date, 'iiii'),
      );

      // then
      const expected = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
      expect(result).toEqual(expected);
    });
  });
});
