<script setup lang="ts">
import { ref } from 'vue';
import { COUNTRIES } from '@consts/countries';
import UiButton from '@components/UiButton.vue';
import { useInjectPayment } from '@composables/injects';
import UiInput from '@components/UiInput.vue';
import UiSelect from '@components/UiSelect.vue';

const { payment } = useInjectPayment();
const isVisible = defineModel();
const emits = defineEmits<{
  pay: [
    {
      name: string;
      cardNumber: string;
      date: string;
      cvc: string;
      country: string;
      zip: string;
    }
  ];
}>();

const name = ref<string>('');
const cardNumber = ref<string>('');
const date = ref<string>('');
const cvc = ref<string>('');
const country = ref<string>('');
const zip = ref<string>('');
const formRef = ref();
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

      <q-form
        ref="formRef"
        @submit.prevent.stop="
          () => {
            formRef.validate();
            emits('pay', { name, cardNumber, date, cvc, country, zip });
          }
        "
      >
        <q-card-section class="grid q-col-gutter-sm">
          <UiInput
            v-model="name"
            class="full"
            :label="$t('Name on Card')"
            filled
            lazy-rules
            :rules="[(val:string) => !!val || 'Name is required']"
            noBottomHint
          />
          <UiInput
            v-model="cardNumber"
            class="full"
            :label="$t('Card Number')"
            mask="#### #### #### ####"
            unmasked-value
            filled
            lazy-rules
            :rules="[
              (val:string) => !!val || 'Card number is required', 
              (val:string) => /[0-9]{16}/.test(val) || 'Invalid card number'
            ]"
            noBottomHint
          />
          <UiInput
            v-model="date"
            :label="$t('Expiration Date')"
            mask="##/##"
            unmasked-value
            filled
            lazy-rules
            :rules="[(val:string) => !!val || 'Expiration Date is required']"
            noBottomHint
          />
          <UiInput
            v-model="cvc"
            label="CVC"
            mask="###"
            unmasked-value
            filled
            lazy-rules
            :rules="[
              (val:string) => !!val || 'CVC is required', 
              (val:string) => /[0-9]{3}/.test(val) || 'Invalid CVC'
            ]"
            noBottomHint
          />
          <UiSelect
            v-model="country"
            :label="$t('Country')"
            :options="
              COUNTRIES.map((e) => ({
                label: `${$t(e)}`,
                value: e.toLowerCase(),
              }))
            "
            emit-value
            map-options
            filled
            lazy-rules
            :rules="[(val:string) => !!val || 'Country is required']"
            noBottomHint
          />
          <UiInput
            v-model="zip"
            label="ZIP"
            filled
            lazy-rules
            :rules="[(val:string) => !!val || 'ZIP is required']"
            noBottomHint
          />
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn flat no-caps v-close-popup>{{ $t('Cancle') }}</q-btn>
          <q-space />
          <UiButton type="submit" no-caps>
            {{ $t('Pay {total}', { total: $n(payment, 'currency') }) }}
          </UiButton>
        </q-card-actions>
      </q-form>
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
