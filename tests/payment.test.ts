import { describe, expect, test } from 'vitest';
import { round } from '../src/utils/math';
import { calPayment, calProcessingPercentageFee } from '../src/utils/payment';

const amount = 25;
const taxRate = 0.06;

describe('calculate processing fee (percentage: 0.01, fixed fee: 0.05)', () => {
  const percentage = 1;
  const fiexdFee = 0.05;

  const percentageFee = calProcessingPercentageFee({
    amount,
    taxRate,
    percentage,
  });

  test('processing percentage fee', () => {
    expect(percentageFee).toBe(0.265);
  });

  test('processing fee', () => {
    expect(percentageFee + fiexdFee).toBe(0.315);
  });

  test('round processing fee', () => {
    expect(round(percentageFee + fiexdFee)).toBe(0.32);
  });
});

describe('calculate processing fee (percentage: 0.025, fixed fee: 0.05)', () => {
  const percentage = 2.5;
  const fiexdFee = 0.05;

  const percentageFee = calProcessingPercentageFee({
    amount,
    taxRate,
    percentage,
  });

  test('processing percentage fee', () => {
    expect(percentageFee).toBe(0.6625);
  });

  test('processing fee', () => {
    expect(percentageFee + fiexdFee).toBe(0.7125);
  });

  test('round processing fee', () => {
    expect(round(percentageFee + fiexdFee)).toBe(0.71);
  });
});

describe('calculate payment', () => {
  const processingFee =
    calProcessingPercentageFee({
      amount,
      taxRate,
      percentage: 2.5,
    }) + 0.05;

  test('by cash', () => {
    expect(
      calPayment({
        payBy: 'cash',
        amount,
        taxRate,
        processingFee,
      })
    ).toBe(26.5);
  });

  test('by card', () => {
    expect(
      calPayment({
        payBy: 'card',
        amount,
        taxRate,
        processingFee,
      })
    ).toBe(27.21);
  });
});
