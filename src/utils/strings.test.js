import { formatCountInThousands } from './strings';

describe('formatCountInThousands function', () => {
  it('should format more than 1000 as expected', () => {
    expect(formatCountInThousands(1001)).toBe('1k');
  });

  it('should format less than 1000 as expected', () => {
    expect(formatCountInThousands(999)).toBe('999');
  });

  it('should format to one decimal point as expected', () => {
    expect(formatCountInThousands(13440)).toBe('13.4k');
  });

  it('should format to drop zero decimal point as expected', () => {
    expect(formatCountInThousands(10001)).toBe('10k');
  });
});
