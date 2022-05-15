import { act, renderHook } from '@testing-library/react-hooks';
import { useDatePicker, UseDatePickerProps } from '../../hooks';

describe('useDatePicker', () => {
  const onDateChange = jest.fn();

  const setup = ({
    selectedDate = null,
    ...rest
  }: Partial<UseDatePickerProps>) =>
    renderHook(() => useDatePicker({ selectedDate, onDateChange, ...rest }));

  describe('initial state', () => {
    it('should return activatedMonths', () => {
      // given
      const { result } = setup({});

      // then
      expect(result.current.activatedMonths.length).toBe(1);
    });
  });

  describe('onDayClick', () => {
    it('should call onDateChange', () => {
      // given
      const date = new Date();
      const { result } = setup({});

      // when
      act(() => {
        result.current.onDayClick(date);
      });

      // then
      expect(onDateChange).toBeCalledWith(date);
    });
  });
});
