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
  --fa-primary-color: white;
  --fa-secondary-color: white;

  &.light {
    background-color: $orange-50;
    color: $orange-400;
    --fa-primary-color: $orange-400;
    --fa-secondary-color: $orange-400;
  }
}

.btn.teal {
  background-color: $teal-300;

  &.light {
    background-color: $teal-50;
    color: $teal-900;
    --fa-primary-color: $teal-900;
    --fa-secondary-color: $teal-900;
  }
}
</style>
