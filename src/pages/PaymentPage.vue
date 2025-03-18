<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import UiContentBox from 'src/components/UiContentBox.vue';
import AmountInput from 'src/components/payment/AmountInput.vue';
import LocationSelect from 'src/components/payment/LocationSelect.vue';
import DeviceSelect from 'src/components/payment/ReaderSelect.vue';
import Summary from 'src/components/payment/SummarySection.vue';
import UiButton from 'src/components/UiButton.vue';
const { t } = useI18n();

const location = ref<string>();
const device = ref<string>();
const amount = ref();
const payBy = ref<'cash' | 'card'>('cash');
</script>

<template>
  <q-page class="column">
    <div class="row">
      <div class="text-2xl text-weight-medium">{{ t('collect payment') }}</div>
      <LocationSelect v-model="location" filled dense bg-color="primary" />
    </div>

    <UiContentBox>
      <!-- {{ data }} -->
      <template #default>
        <div class="section">
          <div class="content">
            <AmountInput v-model="amount" hint="Enter Amount" placeholder="0" />
          </div>
        </div>
      </template>
      <template #right>
        <div class="section text-md text-weight-bold">
          {{ t('Summary') }}
        </div>
        <div class="section">
          <Summary v-model:payBy="payBy" />
        </div>
        <div class="section">
          <LocationSelect v-model="location" borderless dense class="inline" />
          <template v-if="payBy === 'cash'">
            <UiButton
              class="full-width q-mt-lg q-mb-md"
              icon="fa-duotone fa-solid fa-money-bill-wave"
              :label="t('Log Payment')"
            />
          </template>
          <template v-else>
            <DeviceSelect v-model="device" filled dense />
            <UiButton
              class="full-width q-mt-lg q-mb-md"
              icon="fa-duotone fa-solid fa-tablet-screen-button"
              :label="t('Initiate Payment on Reader')"
            />
            <UiButton
              class="full-width"
              icon="fa-duotone fa-solid fa-credit-card"
              :label="t('Input Card Number Manually')"
              light
            />
          </template>
        </div>
      </template>
    </UiContentBox>
  </q-page>
</template>
