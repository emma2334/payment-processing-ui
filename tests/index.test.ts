import { expect, test } from 'vitest';
import { round } from '../src/utils/math';

test('round', () => {
  expect(round(0.123456)).toBe(0.12);
  expect(round(0.987654)).toBe(0.99);
});
