<template>
  <q-slider track-size="6px" thumb-size="24px" />
</template>

<style scoped lang="scss">
:deep(.q-slider__track) {
  $theme-color: $teal-400;

  color: $theme-color;
  background-color: $gray-100;

  .q-slider__thumb {
    color: $theme-color;

    .q-slider__thumb-shape {
      color: white;
      filter: drop-shadow(0 0 4px #9ca3af59);
    }

    .q-slider__text-container {
      white-space: pre;
    }
  }
}
</style>
