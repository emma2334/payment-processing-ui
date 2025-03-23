import { InjectionKey, Ref } from 'vue';

export const InjectionPayment: InjectionKey<{
  payment: Ref<number>;
  amount: Ref<number>;
  taxRate: Ref<number>;
  amountWithTax: Ref<number>;
  processingFee: Ref<number>;
  payBy: Ref<'cash' | 'card'>;
}> = Symbol('payment');
