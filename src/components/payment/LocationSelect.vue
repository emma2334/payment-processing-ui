<script setup lang="ts">
import { defineModel } from 'vue';
import { LOCATIONS } from '@mock/data';
import { useFetch } from '@composables/useFetch';
import UiSelect from '@components/UiSelect.vue';

const location = defineModel<typeof LOCATIONS[number]>();
const { data } = useFetch<typeof LOCATIONS>('/api/locations', {
  onSucess: (data) => {
    location.value = data?.value?.[0];
  },
});
</script>

<template>
  <UiSelect
    v-model="location"
    :options="data"
    option-label="name"
    icon="fa-duotone fa-solid fa-location-dot"
  />
</template>
