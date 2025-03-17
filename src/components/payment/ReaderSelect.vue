<script setup lang="ts">
import { defineModel } from 'vue';
import { useI18n } from 'vue-i18n';
import { PAYMENT_LOCATION_READERS } from 'src/mock/data';
import { useFetch } from '../../composables/useFetch';

defineProps<{
  dense?: boolean;
}>();

const { t } = useI18n();
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
  <q-select
    v-model="reader"
    :options="data"
    option-label="label"
    :label="t('Device Reader')"
  >
    <template #option="scope">
      <q-item v-bind="scope.itemProps" :dense="dense">
        <q-item-section avatar>
          <q-icon
            :name="`fa-duotone fa-solid fa-circle-${
              scope.opt.status === 'online' ? 'dot' : 'xmark'
            }`"
            size="xs"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ scope.opt.label }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<style scoped lang="scss">
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
</style>
