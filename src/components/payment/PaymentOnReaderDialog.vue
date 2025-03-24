<script setup lang="ts">
import { watch } from 'vue';
import { useCountdown } from '@composables/useCountdown';
import UiButton from '@components/UiButton.vue';

const emits = defineEmits<{
  processPayment: [];
}>();
const isVisible = defineModel<boolean>({ default: false });

const { count, start, clear } = useCountdown(5);

watch(isVisible, (newIsVisible) => {
  newIsVisible ? start() : clear();
});

watch(count, (newCount) => {
  if (newCount < 1) handlePayment();
});

function handlePayment() {
  clear();
  emits('processPayment');
}
</script>

<template>
  <q-dialog v-model="isVisible">
    <q-card>
      <q-card-section class="column items-center q-col-gutter-md">
        <img src="~assets/card_payment_flatline.svg" />
        <div class="inline flex items-center text-md text-weight-bold">
          <q-icon name="fa-duotone fa-solid fa-eye" class="q-mr-sm" />
          {{ $t('Review Details with Patient') }}
        </div>
        <div class="text-14">
          {{
            $t(
              'Review details of this transaction with the customer on the device reader. If everything looks good, proceed to process payment.'
            )
          }}
        </div>
        <div class="full-width">
          <UiButton class="full-width light" color="teal" no-caps flat>
            {{ $t('Auto-Processing in {count}s', { count }) }}
          </UiButton>
        </div>
        <span class="text-hint text-xss">{{
          $t('Or click “Process Payment” below')
        }}</span>
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn flat no-caps v-close-popup>{{ $t('Cancle') }}</q-btn>
        <q-space />
        <UiButton no-caps @click="handlePayment">{{
          $t('Process Payment')
        }}</UiButton>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped lang="scss">
.fa-eye {
  --fa-primary-color: black;
  --fa-secondary-color: black;
}
</style>
