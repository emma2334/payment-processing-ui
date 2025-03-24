<script setup lang="ts">
import { defineModel, watch, ref } from 'vue';
import { PAYMENT_LOCATION_READERS } from '@mock/data';
import { useFetch } from '@composables/useFetch';
import UiSelect from '@components/UiSelect.vue';
import UiSelectItem from '@components/UiSelectItem.vue';

const props = defineProps<{
  dense?: boolean;
  locationId?: number;
}>();

let options: typeof PAYMENT_LOCATION_READERS | undefined;
const reader = defineModel();
const { data } = useFetch<typeof PAYMENT_LOCATION_READERS>(
  '/api/payment-location-readers',
  {
    onSucess: (data) => {
      options = props.locationId
        ? data?.value?.filter((e) => e.locationId === props.locationId)
        : data?.value;
      reader.value = options?.[0];
    },
  }
);

const selectRef = ref<InstanceType<typeof UiSelect>>();

watch(
  () => props.locationId,
  () => {
    options = props.locationId
      ? data?.value?.filter((e) => e.locationId === props.locationId)
      : data?.value;
    selectRef.value?.refresh?.();
    reader.value = options?.[0];
  }
);
</script>

<template>
  <UiSelect
    ref="selectRef"
    v-model="reader"
    class="reader"
    :options="options"
    option-label="label"
    :option-disable="(val:typeof PAYMENT_LOCATION_READERS[number]) => val.status === 'offline'"
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
