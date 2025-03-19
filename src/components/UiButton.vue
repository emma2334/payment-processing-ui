<script setup lang="ts">
defineProps<{
  label?: string;
  icon?: string;
  light?: boolean;
  color?: 'orange' | 'teal';
}>();
</script>

<template>
  <q-btn :class="['btn', { light }, color]" :label="label" :icon="icon">
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

.btn.teal {
  background-color: $teal-300;
  color: white;

  &.light {
    background-color: $teal-50;
    color: $teal-400;
  }
}
</style>
