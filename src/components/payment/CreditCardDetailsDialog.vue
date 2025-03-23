<script setup lang="ts">
import { ref } from 'vue';
import { COUNTRIES } from '@consts/countries';
import UiButton from '@components/UiButton.vue';
import { useInjectPayment } from '@composables/injects';
import UiInput from '@components/UiInput.vue';

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

      <q-card-section class="row q-col-gutter-sm">
        <UiInput
          v-model="name"
          class="col-12"
          :label="$t('Name on Card')"
          filled
        />
        <UiInput
          v-model="cardNumber"
          class="col-12"
          :label="$t('Card Number')"
          mask="#### #### #### ####"
          unmasked-value
          filled
        />
        <UiInput
          v-model="date"
          class="col-6"
          :label="$t('Expiration Date')"
          mask="##/##"
          unmasked-value
          filled
        />
        <UiInput
          class="col-6"
          v-model="cvc"
          label="CVC"
          mask="###"
          unmasked-value
          filled
        />
        <q-select
          v-model="country"
          class="col-6"
          :label="$t('Country')"
          :options="
            COUNTRIES.map((e) => ({
              label: `${$t(e)}`,
              value: e.toLowerCase(),
            }))
          "
          filled
        />
        <UiInput class="col-6" v-model="zip" label="ZIP" filled />
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
