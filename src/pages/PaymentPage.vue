<script setup lang="ts">
import { ref } from 'vue';
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

const location = ref<typeof LOCATIONS[number]>();
const device = ref<string>();
const amount = ref();
const payBy = ref<'cash' | 'card'>('cash');
const total = ref<number>(0);

const isCreditCardDetailsDialogVisible = ref(false);
const isPaymentOnReaderDialogVisible = ref(false);
const isEditMerchantProcessingFeeDialogVisible = ref(false);

const { patient, patientPercentageFee } = useProcessingFee(amount);
</script>

<template>
  <q-page class="column">
    <div class="row">
      <div class="text-2xl text-weight-medium">{{ $t('collect payment') }}</div>
      <LocationSelect v-model="location" filled dense />
    </div>

    <UiContentBox>
      <!-- {{ data }} -->
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
            v-model:payBy="payBy"
            :amount="amount"
            :taxRate="Number(location?.taxRate ?? 0)"
            :processingFee="patient.fiexdFee + patientPercentageFee"
            v-model:total="total"
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
      v-model:amount="amount"
      :taxRate="Number(location?.taxRate ?? 0)"
      @update="
        ({ patient: newPatient }) => {
          patient.percentage = newPatient.percentage;
          patient.fiexdFee = newPatient.fiexdFee;
        }
      "
    />
  </q-page>
</template>
