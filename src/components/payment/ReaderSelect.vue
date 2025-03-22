<script setup lang="ts">
import { defineModel } from 'vue';
import { PAYMENT_LOCATION_READERS } from 'src/mock/data';
import { useFetch } from '../../composables/useFetch';
import UiSelect from '../UiSelect.vue';

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
    :optionIcon="
      (data) =>
        data.opt.status === 'online'
          ? 'fa-duotone fa-solid fa-circle-dot'
          : 'fa-duotone fa-solid fa-circle-xmark'
    "
  >
    <template #icon="scope">
      <q-icon
        :name="`fa-duotone fa-solid fa-circle-${
          scope.opt.status === 'online' ? 'dot' : 'xmark'
        }`"
        size="16px"
      />
    </template>
  </UiSelect>
</template>

<style scoped lang="scss">
.reader {
  .fa-circle-xmark {
    color: $gray-400;
    --fa-primary-color: $gray-400;
    --fa-secondary-color: $gray-400;
  }

  .fa-circle-dot {
    color: $green-500;
    --fa-primary-color: $green-500;
    --fa-secondary-color: $green-500;
  }
}
</style>
