import { isRef, Ref, toRef } from 'vue';
import { round } from './math';

export function calPayment({
  payBy,
  amount,
  taxRate,
  processingFee,
}: {
  payBy: 'cash' | 'card' | Ref<'cash' | 'card'>;
  amount: number | Ref<number>;
  taxRate: number | Ref<number>;
  processingFee: number | Ref<number>;
}) {
  if (!isRef(payBy)) payBy = toRef(payBy);
  if (!isRef(amount)) amount = toRef(amount);
  if (!isRef(taxRate)) taxRate = toRef(taxRate);
  if (!isRef(processingFee)) processingFee = toRef(processingFee);
  return round(
    payBy.value === 'cash'
      ? (amount.value ?? 0) * (taxRate.value + 1)
      : (amount.value ?? 0) * (taxRate.value + 1) + processingFee.value
  );
}

export function calProcessingPercentageFee({
  amount,
  taxRate,
  percentage,
}: {
  amount: number | Ref<number>;
  taxRate: number | Ref<number>;
  percentage: number;
}) {
  if (!isRef(amount)) amount = toRef(amount);
  if (!isRef(taxRate)) taxRate = toRef(taxRate);
  return (amount.value * (taxRate.value + 1) * percentage) / 100;
}
