import { inject, readonly, ref } from 'vue';
import { InjectionPayment } from '@consts/symbols';
import { LOCATIONS } from '@mock/data';

export function useInjectPayment() {
  return inject(InjectionPayment, {
    payment: readonly(ref(0)),
    amount: readonly(ref(0)),
    taxRate: readonly(ref(0)),
    amountWithTax: readonly(ref(0)),
    processingFee: readonly(ref(0)),
    payBy: ref<'cash' | 'card'>('cash'),
    description: readonly(ref('')),
    location: readonly(ref<typeof LOCATIONS[number]>()),
  });
}
