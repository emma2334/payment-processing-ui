<script setup lang="ts">
import { ref } from 'vue';
import { COUNTRIES } from '@consts/countries';
import UiButton from '@components/UiButton.vue';
import { useInjectPayment } from '@composables/injects';
import UiInput from '@components/UiInput.vue';
import UiSelect from '@components/UiSelect.vue';

const { payment } = useInjectPayment();
const isVisible = defineModel();

const name = ref<string>();
const cardNumber = ref<string>();
const date = ref<string>();
const cvc = ref<string>();
const country = ref<string>();
const zip = ref<string>();
</script>

<template>
  <q-dialog v-model="isVisible">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-2xl text-weight-bold">
          {{ $t('Credit Card Details') }}
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="grid q-col-gutter-sm">
        <UiInput
          v-model="name"
          class="full"
          :label="$t('Name on Card')"
          filled
        />
        <UiInput
          v-model="cardNumber"
          class="full"
          :label="$t('Card Number')"
          mask="#### #### #### ####"
          unmasked-value
          filled
        />
        <UiInput
          v-model="date"
          :label="$t('Expiration Date')"
          mask="##/##"
          unmasked-value
          filled
        />
        <UiInput v-model="cvc" label="CVC" mask="###" unmasked-value filled />
        <UiSelect
          v-model="country"
          :label="$t('Country')"
          :options="
            COUNTRIES.map((e) => ({
              label: `${$t(e)}`,
              value: e.toLowerCase(),
            }))
          "
          filled
        />
        <UiInput v-model="zip" label="ZIP" filled />
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn flat no-caps v-close-popup>{{ $t('Cancle') }}</q-btn>
        <q-space />
        <UiButton no-caps>{{
          $t('Pay {total}', { total: $n(payment, 'currency') })
        }}</UiButton>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: 100%;

  @media (min-width: $breakpoint-md-min) {
    grid-template-columns: auto auto;

    .full {
      grid-column: 1 / span 2;
    }
  }
}
</style>
