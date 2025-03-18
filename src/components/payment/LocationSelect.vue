<script setup lang="ts">
import { defineModel } from 'vue';
import { LOCATIONS } from 'src/mock/data';
import { useFetch } from '../../composables/useFetch';

const location = defineModel();
const { data } = useFetch<typeof LOCATIONS>('/api/locations', {
  onSucess: (data) => {
    location.value = data?.value?.[0];
  },
});
</script>

<template>
  <q-select v-model="location" :options="data" option-label="name">
    <template #prepend>
      <q-icon name="fa-duotone fa-solid fa-location-dot" @click.stop.prevent />
    </template>
  </q-select>
</template>
