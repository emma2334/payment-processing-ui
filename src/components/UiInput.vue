<script setup lang="ts">
defineProps<{
  noBottomHint?: boolean;
}>();
</script>

<template>
  <q-input class="input" :class="{ 'hide-hint': noBottomHint }" />
</template>

<style scoped lang="scss">
.input {
  :deep(.q-field__control) {
    background-color: $gray-0;
  }

  &.hide-hint {
    padding-bottom: 0;
    :deep(.q-field__bottom) {
      display: none;
    }
  }
}
</style>
