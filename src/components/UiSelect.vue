<script setup lang="ts">
import UiSelectItem from './UiSelectItem.vue';
</script>

<template>
  <q-select class="select">
    <template #option="scope">
      <slot name="option" v-bind="scope">
        <UiSelectItem v-bind="scope.itemProps" :label="scope.label" />
      </slot>
    </template>
  </q-select>
</template>

<style scoped lang="scss">
.select {
  :deep(.q-field--filled) {
    background-color: $gray-0;
  }
}
</style>
