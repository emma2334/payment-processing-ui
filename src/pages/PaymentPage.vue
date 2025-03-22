<script setup lang="ts">
import { provide, ref, computed, readonly } from 'vue';
import { LOCATIONS } from 'src/mock/data';
import UiContentBox from 'src/components/UiContentBox.vue';
import AmountInput from 'src/components/payment/AmountInput.vue';
import LocationSelect from 'src/components/payment/LocationSelect.vue';
import DeviceSelect from 'src/components/payment/ReaderSelect.vue';
import SummarySection from 'src/components/payment/SummarySection.vue';
import UiButton from 'src/components/UiButton.vue';
import CreditCardDetailsDialog from 'src/components/payment/CreditCardDetailsDialog.vue';
import PaymentOnReaderDialog from 'src/components/payment/PaymentOnReaderDialog.vue';
import EditMerchantProcessingFeeDialog from 'src/components/payment/EditMerchantProcessingFeeDialog.vue';
import { useProcessingFee } from 'src/composables/useProcessingFee';
import { InjectionPayment } from 'src/consts/symbols';

const location = ref<typeof LOCATIONS[number]>();
const device = ref<string>();
const amount = ref();
const payBy = ref<'cash' | 'card'>('cash');
const taxRate = computed(() => Number(location.value?.taxRate ?? 0));

const isCreditCardDetailsDialogVisible = ref(false);
const isPaymentOnReaderDialogVisible = ref(false);
const isEditMerchantProcessingFeeDialogVisible = ref(false);

const { patient, patientPercentageFee } = useProcessingFee(amount);

provide(InjectionPayment, {
  payment: computed(() =>
    payBy.value === 'cash'
      ? (amount.value ?? 0) * (taxRate.value + 1)
      : (amount.value ?? 0) * (taxRate.value + 1) + patientPercentageFee.value
  ),
  amount: computed(() => amount.value ?? 0),
  taxRate: readonly(taxRate),
  processingFee: readonly(patientPercentageFee),
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
            <q-input
              class="col-8"
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
</style>
