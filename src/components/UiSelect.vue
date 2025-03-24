<script setup lang="ts">
import UiSelectItem from '@components/UiSelectItem.vue';

defineProps<{
  icon?: string;
  itemIcon?: string;
  noBottomHint?: boolean;
}>();
</script>

<template>
  <q-select class="select" :class="{ 'hide-hint': noBottomHint }">
    <template #prepend v-if="icon || $slots.prepend">
      <slot name="prepend">
        <q-icon :name="icon" size="12px" />
      </slot>
    </template>
    <template #option="scope">
      <slot name="option" v-bind="scope">
        <UiSelectItem
          v-bind="scope.itemProps"
          :label="scope.label"
          :icon="itemIcon"
        />
      </slot>
    </template>
  </q-select>
</template>

<style scoped lang="scss">
.select {
  :deep(.q-field--filled) {
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
