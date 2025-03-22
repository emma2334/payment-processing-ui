<script setup lang="ts"></script>

<template>
  <div class="wrapper flex full-width">
    <div class="content col">
      <slot />
    </div>
    <div v-if="$slots.right" class="content right">
      <slot name="right" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  flex-direction: column;
  border: solid 1px $gray-200;
  border-radius: 8px;

  @media (min-width: $breakpoint-md-min) {
    flex-direction: row;
  }
}

.content {
  &.right {
    border-top: solid 1px $gray-200;

    @media (min-width: $breakpoint-md-min) {
      width: 30%;
      border-top: 0;
      border-left: solid 1px $gray-200;
    }
  }

  :deep(.section) {
    padding: 16px;
    font-size: map-get($font-sizes, xs);

    &:not(:last-child) {
      border-bottom: solid 1px $gray-100;
    }
  }
}
</style>
