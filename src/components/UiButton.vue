<script setup lang="ts">
defineProps<{
  label?: string;
  icon?: string;
  light?: boolean;
}>();
</script>

<template>
  <q-btn :class="['btn', { light }]" :label="label" :icon="icon">
    <slot />
  </q-btn>
</template>

<style scoped lang="scss">
.btn {
  background-color: $orange-300;
  color: white;

  &.light {
    background-color: $orange-50;
    color: $orange-400;
  }
}
</style>
