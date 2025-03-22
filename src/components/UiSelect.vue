<script setup lang="ts">
defineProps<{
  optionIcon?: string | ((data: any) => string);
  options: any;
}>();
</script>

<template>
  <q-select class="select" :options="options">
    <template #option="scope">
      <q-item v-bind="scope.itemProps" class="option">
        <q-item-section v-if="optionIcon" avatar>
          <q-icon
            :name="
              typeof optionIcon === 'function' ? optionIcon(scope) : optionIcon
            "
            size="16px"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ scope.label }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<style scoped lang="scss">
.select {
  :deep(.q-field--filled) {
    background-color: $gray-0;
  }
}

.option {
  margin: 8px;
  border-radius: 6px;

  &.q-item--active {
    color: black;
  }

  &:not(.q-item--active) {
    opacity: 0.4;
  }

  :deep(.q-item__section--avatar) {
    min-width: unset;
  }
}
</style>
