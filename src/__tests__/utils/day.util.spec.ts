import { format } from 'date-fns';
import { getDays, getWeekdayLabels, isDisabled } from '../../utils/day.util';

describe('Day util', () => {
  describe('getDays', () => {
    it('should return days with previous month empty days', () => {
      // given
      const date = new Date(2020, 0);
      const firstDayOfWeek = 0;

      // when
      const result = getDays({ date, firstDayOfWeek });

      // then
      expect(result[0]).toBeNull();
      expect(result[1]).toBeNull();
      expect(result[2]).toBeNull();
      expect(result[3]?.label).toBe('01');
    });

    it('should return days with label format', () => {
      // given
      const date = new Date(2020, 0);
      const firstDayOfWeek = 0;

      // when
      const result = getDays({
        date,
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

  describe('isDisabled', () => {
    it('should return false', () => {
      // given
      const date = new Date('2020/01/01');
      const unavailableDates: Date[] = [];

      // when
      const result = isDisabled({ date, unavailableDates });

      // then
      expect(result).toBe(false);
    });

    it('should return true when is before minDate', () => {
      // given
      const date = new Date('2020/01/01');
      const unavailableDates: Date[] = [];
      const minDate = new Date('2020/01/02');

      // when
      const result = isDisabled({ date, unavailableDates, minDate });

      // then
      expect(result).toBe(true);
    });

    it('should return true when is after maxDate', () => {
      // given
      const date = new Date('2020/01/01');
      const unavailableDates: Date[] = [];
      const maxDate = new Date('2019/12/31');

      // when
      const result = isDisabled({ date, unavailableDates, maxDate });

      // then
      expect(result).toBe(true);
    });
  });
});
