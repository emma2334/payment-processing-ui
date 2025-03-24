<script setup lang="ts">
import { provide, ref, computed, readonly } from 'vue';
import { LOCATIONS } from '@mock/data';
import UiContentBox from '@components/UiContentBox.vue';
import AmountInput from '@components/payment/AmountInput.vue';
import LocationSelect from '@components/payment/LocationSelect.vue';
import SummarySection from '@components/payment/SummarySection.vue';
import EditMerchantProcessingFeeDialog from '@components/payment/EditMerchantProcessingFeeDialog.vue';
import UiInput from '@components/UiInput.vue';
import { useProcessingFee } from '@composables/useProcessingFee';
import { InjectionPayment } from '@consts/symbols';
import { calPayment } from '@utils/payment';
import CheckoutSection from '@components/payment/CheckoutSection.vue';

const location = ref<typeof LOCATIONS[number]>();
const amount = ref<number>(0);
const amountRef = ref<InstanceType<typeof AmountInput>>();
const description = ref<string>('');
const payBy = ref<'cash' | 'card'>('cash');
const taxRate = computed(() => Number(location.value?.taxRate ?? 0));

const isEditMerchantProcessingFeeDialogVisible = ref(false);

const { patient, patientPercentageFee } = useProcessingFee(amount, taxRate);
const processingFee = computed(() =>
  amount.value ? patientPercentageFee.value + patient.fiexdFee : 0
);

provide(InjectionPayment, {
  payment: computed(() =>
    calPayment({ payBy, amount, taxRate, processingFee })
  ),
  amount,
  taxRate,
  amountWithTax: computed(() => amount.value * (taxRate.value + 1)),
  processingFee: readonly(processingFee),
  payBy,
  description,
  location,
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
        @click.prevent="amountRef?.clear"
      >
        {{ $t('Reset Payment') }}
      </a>
    </div>

    <UiContentBox>
      <template #default>
        <div class="section">
          <div class="content">
            <AmountInput
              ref="amountRef"
              v-model="amount"
              class="q-mb-md"
              :hint="$t('Enter Amount')"
              placeholder="0"
            />
          </div>
          <div class="content">
            <UiInput
              v-model="description"
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
          <CheckoutSection />
        </div>
      </template>
    </UiContentBox>

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
