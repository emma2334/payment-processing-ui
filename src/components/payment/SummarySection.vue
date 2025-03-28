<script setup lang="ts">
import { computed } from 'vue';
import UiOptionGroup from '@components/UiOptionGroup.vue';
import { useInjectPayment } from '@composables/injects';
import { MIN_AMOUNT } from '@consts/payment';

const emit = defineEmits<{
  editProcessingFee: [];
}>();

const { payment, amount, taxRate, amountWithTax, processingFee, payBy } =
  useInjectPayment();
const isInvalidAmount = computed(
  () => amount.value > 0 && amount.value < MIN_AMOUNT
);
</script>

<template>
  <div class="flex q-py-md">
    {{ $t('Subtotal') }}
    <q-space />
    <span>{{ $n(amount, 'currency') }}</span>
  </div>

  <div class="flex q-py-md">
    {{ $t('Tax') }} {{ $n(taxRate, 'percent') }}
    <q-space />
    <span>{{ $n(amount * taxRate, 'currency') }}</span>
  </div>

  <hr />

  <div class="flex q-py-lg text-weight-medium">
    {{ $t('Total') }}
    <q-space />
    <span>{{ $n(amountWithTax, 'currency') }}</span>
  </div>

  <UiOptionGroup
    class="q-pb-lg"
    spread
    no-caps
    outline
    v-model="payBy"
    :options="[
      {
        value: 'cash',
        label: `${$t('Pay by Cash')} ${$n(amountWithTax, 'currency')}`,
        icon: 'fa-duotone fa-solid fa-sack-dollar',
      },
      {
        value: 'card',
        label: `${$t('Pay by Card')} ${$n(
          amountWithTax + processingFee,
          'currency'
        )}`,
        icon: 'fa-duotone fa-solid fa-credit-card',
      },
    ]"
  />

  <div v-if="payBy === 'card'" class="flex q-pb-lg">
    <span>
      {{ $t('Patient Card Processing Fee') }}
      <a href="#" @click="emit('editProcessingFee')">{{ $t('Edit') }}</a>
    </span>
    <q-space />
    <span>{{ $n(processingFee, 'currency') }}</span>
  </div>

  <hr />

  <div class="flex items-center q-py-lg text-weight-bold">
    <template v-if="payBy === 'cash'">
      {{ $t('Pay by Cash Total') }}
    </template>
    <template v-else>
      {{ $t('Pay by Card Total') }}
    </template>
    <q-space />
    <span
      :class="['text-xl', isInvalidAmount ? 'text-negative' : 'text-positive']"
      >{{ $n(payment, 'currency') }}</span
    >
  </div>

  <span v-if="isInvalidAmount" class="text-negative text-weight-medium">
    *{{
      $t('Total amount falls below the required minimum of {limit}', {
        limit: $n(MIN_AMOUNT, 'currency'),
      })
    }}
  </span>
</template>

<style scoped lang="scss">
.teal {
  color: $teal-700;
}
</style>
