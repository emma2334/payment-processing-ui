<script setup lang="ts">
import { defineModel } from 'vue';
import { PAYMENT_LOCATION_READERS } from 'src/mock/data';
import { useFetch } from '../../composables/useFetch';
import UiSelect from '../UiSelect.vue';
import UiSelectItem from '../UiSelectItem.vue';

defineProps<{
  dense?: boolean;
}>();

const reader = defineModel();
const { data } = useFetch<typeof PAYMENT_LOCATION_READERS>(
  '/api/payment-location-readers',
  {
    onSucess: (data) => {
      reader.value = data?.value?.[0];
    },
  }
);
</script>

<template>
  <UiSelect
    v-model="reader"
    class="reader"
    :options="data"
    option-label="label"
    :label="$t('Device Reader')"
  >
    <template #option="scope">
      <UiSelectItem
        v-bind="scope.itemProps"
        :class="['option', scope.opt.status]"
        dense
        :icon="`fa-duotone fa-solid fa-circle-${
          scope.opt.status === 'online' ? 'dot' : 'xmark'
        }`"
        :label="scope.label"
      />
    </template>
  </UiSelect>
</template>

<style scoped lang="scss">
.option {
  margin: 0 8px;
  border-radius: 6px;

  &.online {
    &.q-item--active,
    :deep(.q-icon) {
      color: $green-500;
      --fa-primary-color: $green-500;
      --fa-secondary-color: $green-500;
    }
  }

  &.offline {
    color: $gray-400;
    --fa-primary-color: $gray-400;
    --fa-secondary-color: $gray-400;

    :deep(.q-focus-helper) {
      background-color: black !important;
    }
  }

  &:first-child {
    margin-top: 8px;
  }

  &:last-child {
    margin-bottom: 8px;
  }
}
</style>
