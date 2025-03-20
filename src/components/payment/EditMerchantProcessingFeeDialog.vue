<script setup lang="ts">
import { watch, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { ceil, round } from '../../utils/math';
import UiButton from '../UiButton.vue';
import { reactive } from 'vue';
import UiSlider from '../UiSlider.vue';

const PERCENTAGE = 3.5;
const FIXED_FEE = 0.1;

const props = withDefaults(
  defineProps<{
    amount: number;
  }>(),
  { amount: 0 }
);

const { t } = useI18n();
const isVisible = defineModel();

const merchant = reactive({
  percentage: 1,
  fiexdFee: 0.05,
});

const patient = reactive({
  percentage: 2.5,
  fiexdFee: 0.05,
});

watch(merchant, (newMerchant) => {
  if (newMerchant.percentage + patient.percentage !== PERCENTAGE)
    patient.percentage = round(PERCENTAGE - newMerchant.percentage);
  if (newMerchant.fiexdFee + patient.fiexdFee !== FIXED_FEE)
    patient.fiexdFee = round(FIXED_FEE - newMerchant.fiexdFee);
});

watch(patient, (newPatient) => {
  if (newPatient.percentage + merchant.percentage !== PERCENTAGE)
    merchant.percentage = round(PERCENTAGE - newPatient.percentage);
  if (newPatient.fiexdFee + merchant.fiexdFee !== FIXED_FEE)
    merchant.fiexdFee = round(FIXED_FEE - newPatient.fiexdFee);
});

const merchantPercentageFee = computed(() =>
  ceil((props.amount * merchant.percentage) / 100)
);
const merchantFee = computed(() =>
  ceil(merchantPercentageFee.value + merchant.fiexdFee)
);

const patientFee = computed(() =>
  ceil((props.amount * patient.percentage) / 100 + patient.fiexdFee)
);
</script>

<template>
  <q-dialog v-model="isVisible">
    <q-card>
      <q-card-section class="q-pb-none">
        <div class="row items-center">
          <div class="text-2xl text-weight-bold">
            {{ t('Edit Merchant Processing Fee') }}
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </div>
        <div class="text-hint font-xs">
          {{ t('Only applies to this transaction') }}
        </div>
      </q-card-section>

      <q-card-section class="q-px-xl">
        <UiSlider
          v-model="merchant.percentage"
          :min="0"
          :max="PERCENTAGE"
          :step="0.01"
          :marker-labels="[
            { value: 0, label: '0' },
            { value: PERCENTAGE, label: `${PERCENTAGE}%` },
          ]"
          label
          :label-value="`${merchant.percentage}%\n$${merchantPercentageFee}`"
        />
      </q-card-section>

      <q-separator class="q-mx-md" />

      <q-card-section class="row q-col-gutter-sm justify-center">
        <div class="row items-center q-col-gutter-sm">
          {{ t('Merchant processing fee') }}

          <q-input
            v-model.number="merchant.percentage"
            :min="0"
            :max="FIXED_FEE"
            class="col"
            type="number"
            filled
            dense
            :rules="[(val:number) => (val >= 0 && val <= PERCENTAGE)]"
          >
            <template #append>%</template>
          </q-input>
          <span class="text-hint text-xss">/ {{ PERCENTAGE }}%</span>
          <q-input
            v-model.number="merchant.fiexdFee"
            min="0"
            class="col"
            type="number"
            filled
            dense
            :rules="[(val:number) => (val >= 0 && val <= FIXED_FEE)]"
          >
            <template #prepend>$</template>
          </q-input>
          <span class="text-hint text-xss">/ ${{ FIXED_FEE }}</span>
        </div>
        <div class="row items-center q-col-gutter-sm">
          {{ t('Patient processing fee') }}

          <q-input
            v-model.number="patient.percentage"
            min="0"
            :max="FIXED_FEE"
            class="col"
            type="number"
            filled
            dense
            :rules="[(val:number) => (val >= 0 && val <= PERCENTAGE)]"
          >
            <template #append>%</template>
          </q-input>
          <span class="text-hint text-xss">/ {{ PERCENTAGE }}%</span>
          <q-input
            v-model.number="patient.fiexdFee"
            min="0"
            class="col"
            type="number"
            filled
            dense
            :rules="[(val:number) => (val >= 0 && val <= FIXED_FEE)]"
          >
            <template #prepend>$</template>
          </q-input>
          <span class="text-hint text-xss">/ ${{ FIXED_FEE }}</span>
        </div>
        <a
          class="text-xs"
          href=""
          @click.prevent="
            async () => {
              patient.fiexdFee = 0;
              await $nextTick();
              patient.percentage = 0;
            }
          "
          >Set patient processing fee to 0</a
        >
      </q-card-section>

      <q-card-section class="text-center">
        <div class="text-weight-bold">
          {{
            t(
              'On this ${amount} transaction, you pay ${merchant_fee}, and patient pays ${patient_fee}',
              { amount, merchant_fee: merchantFee, patient_fee: patientFee }
            )
          }}
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn flat no-caps v-close-popup>{{ t('Cancle') }}</q-btn>
        <q-space />
        <UiButton no-caps>{{ t('Update') }}</UiButton>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped lang="scss">
:deep(.q-input) {
  padding-bottom: 0;

  input {
    font-weight: 700;
    font-size: map-get($font-sizes, md);
  }

  .q-field__bottom {
    display: none;
  }
}
</style>
