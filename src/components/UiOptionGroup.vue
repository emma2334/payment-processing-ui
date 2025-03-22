<script setup lang="ts">
defineProps<{
  options: {
    value: string;
    label: string;
    icon?: string;
  }[];
}>();
</script>

<template>
  <q-btn-toggle
    class="btn"
    :options="options.map(({ value }) => ({ value, slot: value }))"
  >
    <template
      v-for="option in options"
      :key="option.value"
      v-slot:[option.value]
    >
      <div class="row items-center no-wrap">
        <q-icon v-if="option.icon" left :name="option.icon" />
        <div class="text-center">{{ option.label }}</div>
      </div>
    </template>
  </q-btn-toggle>
</template>

<style scoped lang="scss">
.btn :deep(button) {
  color: $teal-700 !important;
  --fa-primary-color: $teal-700;
  --fa-secondary-color: $teal-700;

  .q-icon {
    font-size: 12px;
  }

  &[aria-pressed='true'] {
    background-color: $teal-100 !important;
  }

  &.q-btn--outline:before {
    border-color: $teal-100 !important;
  }
}
</style>
