<script setup lang="ts">
import UiButton from '../UiButton.vue';
import UiSlider from '../UiSlider.vue';
import { useProcessingFee } from 'src/composables/useProcessingFee';
import { useInjectPayment } from 'src/composables/injects';

defineEmits<{
  update: [{ merchant: typeof merchant; patient: typeof patient }];
}>();

const { amount } = useInjectPayment();
const isVisible = defineModel();

const {
  percentage,
  fiexdFee,
  merchant,
  patient,
  merchantPercentageFee,
  patientPercentageFee,
} = useProcessingFee(amount);
</script>

<template>
  <q-dialog v-model="isVisible">
    <q-card>
      <q-card-section class="q-pb-none">
        <div class="row items-center">
          <div class="text-2xl text-weight-bold">
            {{ $t('Edit Merchant Processing Fee') }}
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </div>
        <div class="text-hint font-xs">
          {{ $t('Only applies to this transaction') }}
        </div>
      </q-card-section>

      <q-card-section class="q-px-xl">
        <UiSlider
          v-if="percentage"
          v-model="merchant.percentage"
          :min="0"
          :max="percentage"
          :step="0.01"
          :marker-labels="[
            { value: 0, label: '0' },
            {
              value: percentage,
              label: `${$n(percentage, { maximumFractionDigits: 1 })}%`,
            },
          ]"
          label
          :label-value="`${merchant.percentage}%\n${$n(
            merchantPercentageFee,
            'currency'
          )}`"
        />
      </q-card-section>

      <q-separator class="q-mx-md" />

      <q-card-section class="row q-col-gutter-sm justify-center">
        <div class="row items-center q-col-gutter-sm">
          <span>{{ $t('Merchant processing fee') }}</span>

          <q-input
            v-model.number="merchant.percentage"
            :min="0"
            :max="fiexdFee"
            class="col"
            type="number"
            filled
            dense
            :rules="[(val:number) => (val >= 0 && val <= percentage)]"
          >
            <template #append>%</template>
          </q-input>
          <span class="text-hint text-xss"
            >/ {{ $n(percentage, { maximumFractionDigits: 1 }) }}%</span
          >
          <span>+</span>
          <q-input
            v-model.number="merchant.fiexdFee"
            min="0"
            class="col"
            type="number"
            filled
            dense
            :rules="[(val:number) => (val >= 0 && val <= fiexdFee)]"
          >
            <template #prepend>$</template>
          </q-input>
          <span class="text-hint text-xss"
            >/ {{ $n(fiexdFee, 'currency') }}</span
          >
        </div>
        <div class="row items-center q-col-gutter-sm">
          <span>{{ $t('Patient processing fee') }}</span>
          <q-input
            v-model.number="patient.percentage"
            min="0"
            :max="fiexdFee"
            class="col"
            type="number"
            filled
            dense
            :rules="[(val:number) => (val >= 0 && val <= percentage)]"
          >
            <template #append>%</template>
          </q-input>
          <span class="text-hint text-xss"
            >/ {{ $n(percentage, { maximumFractionDigits: 1 }) }}%</span
          >
          <span>+</span>
          <q-input
            v-model.number="patient.fiexdFee"
            min="0"
            class="col"
            type="number"
            filled
            dense
            :rules="[(val:number) => (val >= 0 && val <= fiexdFee)]"
          >
            <template #prepend>$</template>
          </q-input>
          <span class="text-hint text-xss"
            >/ {{ $n(fiexdFee, 'currency') }}</span
          >
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
            $t(
              'On this {amount} transaction, you pay {merchant_fee}, and patient pays {patient_fee}',
              {
                amount: $n(amount, 'currency'),
                merchant_fee: $n(
                  merchantPercentageFee + merchant.fiexdFee,
                  'currency'
                ),
                patient_fee: $n(
                  patientPercentageFee + patient.fiexdFee,
                  'currency'
                ),
              }
            )
          }}
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn flat no-caps v-close-popup>{{ $t('Cancle') }}</q-btn>
        <q-space />
        <UiButton
          no-caps
          v-close-popup
          @click="$emit('update', { merchant, patient })"
          >{{ $t('Update') }}</UiButton
        >
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
