<script setup lang="ts">
defineProps<{
  label?: string;
}>();
</script>

<template>
  <q-item class="select-item">
    <q-item-section v-if="$slots.icon" avatar>
      <slot name="icon" v-bind="$attrs" />
    </q-item-section>
    <q-item-section>
      <q-item-label>
        <slot>{{ label }}</slot>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<style scoped lang="scss">
.select-item {
  :deep(.q-item__section--avatar) {
    min-width: unset;
  }
}
</style>
