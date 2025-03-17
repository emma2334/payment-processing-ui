<script setup lang="ts"></script>

<template>
  <div class="wrapper column row-md full-width">
    <div class="content col">
      <slot />
    </div>
    <div v-if="$slots.right" class="content right col-3">
      <slot name="right" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  border: solid 1px $gray-200;
  border-radius: 8px;
}

.content {
  &.right {
    border-top: solid 1px $gray-200;

    @media (min-width: $breakpoint-md-min) {
      font-size: 10px;
      border-top: 0;
      border-left: solid 1px $gray-200;
    }
  }

  :deep(.section) {
    padding: 16px;
    &:not(:last-child) {
      border-bottom: solid 1px $gray-100;
    }
  }
}
</style>
