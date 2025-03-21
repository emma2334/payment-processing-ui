import { inject, readonly, ref } from 'vue';
import { InjectionPayment } from 'src/consts/symbols';

export function useInjectPayment() {
  return inject(InjectionPayment, {
    payment: readonly(ref(0)),
    amount: readonly(ref(0)),
    taxRate: readonly(ref(0)),
    processingFee: readonly(ref(0)),
    payBy: ref<'cash' | 'card'>('cash'),
  });
}
