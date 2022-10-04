import { allValuesInArrayAreUnique } from './array';

describe('Array utils', () => {
  describe('allValuesInArrayAreUnique', () => {
    it('Should pass', () => {
      const arr = ['a', 'b', 'c'];
      const result = allValuesInArrayAreUnique(arr);
      expect(result).toBeTruthy();
    });

    it('Should not pass', () => {
      const arr = ['a', 'b', 'b'];
      const result = allValuesInArrayAreUnique(arr);
      expect(result).toBeFalsy();
    });
  });
});
