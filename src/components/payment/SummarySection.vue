<script setup lang="ts">
import { watch } from 'vue';
import UiOptionGroup from '../UiOptionGroup.vue';

const props = withDefaults(
  defineProps<{
    amount: number;
    taxRate: number;
    processingFee: number;
  }>(),
  {
    amount: 0,
    taxRate: 0,
    percentage: 0,
    fiexdFee: 0,
  }
);

const payBy = defineModel<'cash' | 'card'>('payBy');
const total = defineModel<number>('total', { default: 0 });

const emit = defineEmits<{
  (e: 'editProcessingFee'): void;
}>();

watch([() => props.amount, () => props.taxRate], ([newAmount, newTaxRate]) => {
  total.value = newAmount * (1 + newTaxRate);
});
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
    <span>{{ $n(total, 'currency') }}</span>
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
        label: `${$t('Pay by Cash')} ${$n(total, 'currency')}`,
        icon: 'fa-duotone fa-solid fa-sack-dollar',
      },
      {
        value: 'card',
        label: `${$t('Pay by Card')} ${$n(total + processingFee, 'currency')}`,
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
    <span v-if="payBy === 'cash'">
      {{ $t('Pay by Cash Total') }}
      <q-space />
      <span class="text-xl green">{{ $n(total, 'currency') }}</span>
    </span>
    <span v-else>
      {{ $t('Pay by Card Total') }}
      <q-space />
      <span class="text-xl green">{{
        $n(total + processingFee, 'currency')
      }}</span>
    </span>
  </div>

  <span v-if="total > 0 && total < 0.05" class="red text-weight-medium">
    *{{
      $t('Total amount falls below the required minimum of {limit}', {
        limit: $n(0.05, 'currency'),
      })
    }}
  </span>
</template>

<style scoped lang="scss">
.green {
  color: $green-500;
}

.red {
  color: $red-500;
}

.teal {
  color: $teal-700;
}
</style>
