<script setup lang="ts">
import { provide, ref, computed, readonly } from 'vue';
import { LOCATIONS } from '@mock/data';
import UiContentBox from '@components/UiContentBox.vue';
import AmountInput from '@components/payment/AmountInput.vue';
import LocationSelect from '@components/payment/LocationSelect.vue';
import DeviceSelect from '@components/payment/ReaderSelect.vue';
import SummarySection from '@components/payment/SummarySection.vue';
import UiButton from '@components/UiButton.vue';
import CreditCardDetailsDialog from '@components/payment/CreditCardDetailsDialog.vue';
import PaymentOnReaderDialog from '@components/payment/PaymentOnReaderDialog.vue';
import EditMerchantProcessingFeeDialog from '@components/payment/EditMerchantProcessingFeeDialog.vue';
import UiInput from '@components/UiInput.vue';
import { useProcessingFee } from '@composables/useProcessingFee';
import { InjectionPayment } from '@consts/symbols';

const location = ref<typeof LOCATIONS[number]>();
const device = ref<string>();
const amount = ref();
const payBy = ref<'cash' | 'card'>('cash');
const taxRate = computed(() => Number(location.value?.taxRate ?? 0));
const amountWithTax = computed(() => (amount.value ?? 0) * (taxRate.value + 1));

const isCreditCardDetailsDialogVisible = ref(false);
const isPaymentOnReaderDialogVisible = ref(false);
const isEditMerchantProcessingFeeDialogVisible = ref(false);

const { patient, patientPercentageFee } = useProcessingFee(amountWithTax);
const processingFee = computed(() =>
  amount.value ? patientPercentageFee.value + patient.fiexdFee : 0
);

provide(InjectionPayment, {
  payment: computed(() =>
    payBy.value === 'cash'
      ? amountWithTax.value
      : amountWithTax.value + processingFee.value
  ),
  amount: computed(() => amount.value ?? 0),
  taxRate,
  amountWithTax,
  processingFee: readonly(processingFee),
  payBy,
});
</script>

<template>
  <q-page class="column">
    <div class="header row items-center q-mb-md">
      <div class="q-mr-sm text-2xl text-weight-medium">
        {{ $t('collect payment') }}
      </div>
      <LocationSelect class="location" v-model="location" filled dense />
      <q-space />
      <a
        v-if="amount"
        class="text-negative"
        href=""
        @click.prevent="amount = undefined"
      >
        {{ $t('Reset Payment') }}
      </a>
    </div>

    <UiContentBox>
      <template #default>
        <div class="section">
          <div class="content">
            <AmountInput
              v-model="amount"
              :hint="$t('Enter Amount')"
              placeholder="0"
            />
          </div>
          <div class="content">
            <UiInput
              class="description"
              filled
              type="textarea"
              :label="$t('Description (Optional)')"
            />
          </div>
        </div>
      </template>
      <template #right>
        <div class="section text-md text-weight-bold">
          {{ $t('Summary') }}
        </div>
        <div class="section">
          <SummarySection
            @editProcessingFee="isEditMerchantProcessingFeeDialogVisible = true"
          />
        </div>
        <div class="section">
          <LocationSelect v-model="location" borderless dense class="inline" />
          <template v-if="payBy === 'cash'">
            <UiButton
              class="full-width q-mt-lg q-mb-md"
              icon="fa-duotone fa-solid fa-money-bill-wave"
              :label="$t('Log Payment')"
              no-caps
            />
          </template>
          <template v-else>
            <DeviceSelect v-model="device" filled dense />
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
          </template>
        </div>
      </template>
    </UiContentBox>

    <CreditCardDetailsDialog v-model="isCreditCardDetailsDialogVisible" />
    <PaymentOnReaderDialog v-model="isPaymentOnReaderDialogVisible" />
    <EditMerchantProcessingFeeDialog
      v-model="isEditMerchantProcessingFeeDialogVisible"
      @update="
        ({ patient: newPatient }) => {
          patient.percentage = newPatient.percentage;
          patient.fiexdFee = newPatient.fiexdFee;
        }
      "
    />
  </q-page>
</template>

<style scoped lang="scss">
@media (max-width: $breakpoint-sm-max) {
  .header .location {
    order: 1;
    margin-top: 16px;
    width: 100%;
  }
}

.description {
  @media (min-width: $breakpoint-md-min) {
    max-width: 400px;
    margin: auto;
  }
}
</style>
