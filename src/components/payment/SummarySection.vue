<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import UiOptionGroup from '../UiOptionGroup.vue';

const { t } = useI18n();
const payBy = defineModel('payBy');
const emit = defineEmits<{
  (e: 'editProcessingFee'): void;
}>();
</script>

<template>
  <div class="flex q-py-md">
    {{ t('Subtotal') }}
    <q-space />
    <span>$0</span>
  </div>

  <div class="flex q-py-md">
    {{ t('Tax') }}
    <q-space />
    <span>$0</span>
  </div>

  <hr />

  <div class="q-py-lg text-weight-medium">
    {{ t('Total') }}
  </div>

  <UiOptionGroup
    spread
    no-caps
    outline
    v-model="payBy"
    :options="[
      {
        value: 'cash',
        label: t('Pay by Cash'),
        icon: 'fa-duotone fa-solid fa-sack-dollar',
      },
      {
        value: 'card',
        label: t('Pay by Card'),
        icon: 'fa-duotone fa-solid fa-credit-card',
      },
    ]"
  />

  <div class="flex q-py-lg">
    <span>
      {{ t('Patient Card Processing Fee') }}
      <a href="#" @click="emit('editProcessingFee')">{{ t('Edit') }}</a>
    </span>
    <q-space />
    <span>$0</span>
  </div>

  <hr />

  <div class="flex items-center q-py-lg text-weight-bold">
    <template v-if="payBy === 'cash'">
      {{ t('Pay by Cash Total') }}
    </template>
    <template v-else>
      {{ t('Pay by Card Total') }}
    </template>
    <q-space />
    <span class="text-xl green">$0</span>
  </div>

  <span class="red text-weight-medium">
    *{{ t('Total amount falls below the required minimum of $0.50') }}
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
