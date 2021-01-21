import {CardNumberPipe} from './card-number.pipe';

describe('CardNumberPipe', () => {
  const pipe = new CardNumberPipe();

  it('should separate number with space in group of 4 digits', () => {
    expect(pipe.transform('1234567812345678')).toBe('1234 5678 1234 5678');
  });
});
