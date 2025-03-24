<script setup lang="ts">
import { ref } from 'vue';
import { useInjectPayment } from '@composables/injects';
import { useLoadingOverlay } from '@composables/useLoadingOverlay';
import UiButton from '@components/UiButton.vue';
import ReaderSelect from '@components/payment/ReaderSelect.vue';
import CreditCardDetailsDialog from '@components/payment/CreditCardDetailsDialog.vue';
import PaymentOnReaderDialog from '@components/payment/PaymentOnReaderDialog.vue';
import { PAYMENT_LOCATION_READERS } from '@mock/data';

const { payment, payBy, description } = useInjectPayment();

const reader = ref<typeof PAYMENT_LOCATION_READERS[number]>();
const isCreditCardDetailsDialogVisible = ref(false);
const isPaymentOnReaderDialogVisible = ref(false);

const { show, hide } = useLoadingOverlay({ customClass: 'checkout-loading' });

function payByCash() {
  show(
    `Pay by cash\ntotal: ${payment.value}\ndescription: ${description.value}`
  );

  const timer = setTimeout(() => {
    hide();
    clearTimeout(timer);
  }, 2000);
}

function payByCard(card?: Record<string, string>) {
  let msg = `Pay by card\ntotal: ${payment.value}\ndescription: ${description.value}`;

  // show reader info
  msg += '\n===';
  msg += `\nreader: ${reader.value?.label}`;
  msg += `\nid: ${reader.value?.readerId}`;

  // show card info
  if (card) {
    msg += '\n===';
    for (const key in card) {
      msg += `\n${key}: ${card[key]}`;
    }
  }
  show(msg);

  const timer = setTimeout(() => {
    hide();
    clearTimeout(timer);
  }, 2000);
}
</script>

<template>
  <template v-if="payBy === 'cash'">
    <UiButton
      class="full-width q-mt-lg q-mb-md"
      icon="fa-duotone fa-solid fa-money-bill-wave"
      :label="$t('Log Payment')"
      no-caps
      @click="payByCash"
    />
  </template>
  <template v-else>
    <ReaderSelect v-model="reader" filled dense />
    <UiButton
      class="full-width q-mt-lg q-mb-md"
      icon="fa-duotone fa-solid fa-tablet-screen-button"
      :label="$t('Initiate Payment on Reader')"
      no-caps
      @click="isPaymentOnReaderDialogVisible = true"
    />
    <UiButton
      class="full-width"
      icon="fa-duotone fa-solid fa-credit-card"
      :label="$t('Input Card Number Manually')"
      light
      no-caps
      @click="isCreditCardDetailsDialogVisible = true"
    />
    <CreditCardDetailsDialog
      v-model="isCreditCardDetailsDialogVisible"
      @pay="payByCard"
    />
    <PaymentOnReaderDialog
      v-model="isPaymentOnReaderDialogVisible"
      @process-payment="payByCard"
    />
  </template>
</template>

<style lang="scss">
.checkout-loading .q-loading__message {
  white-space: pre;
}
</style>
