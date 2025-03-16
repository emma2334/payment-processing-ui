<script setup lang="ts">
import { defineModel } from 'vue';

defineProps<{
  placeholder?: string;
}>();

const amount = defineModel();
function handleKeydown(e: KeyboardEvent) {
  const allowedKeys = [
    'Backspace',
    'ArrowLeft',
    'ArrowRight',
    'Delete',
    '.',
    ...Array(10)
      .fill(0)
      .map((e, i) => `${i}`),
  ];
  const { innerText = '' } = e.target as HTMLInputElement;
  const newInput = e.key.match(/^[0-9\.]$/) ? innerText + e.key : innerText;

  if (
    (!e.ctrlKey && !e.metaKey && !allowedKeys.includes(e.key)) ||
    isNaN(Number(newInput))
  ) {
    e.preventDefault();
  }
}

function handleInput(e: Event) {
  amount.value = (e.target as HTMLInputElement).innerText;
}
</script>

<template>
  <div>
    <span
      class="text-7xl text-weight-bold"
      role="textbox"
      contenteditable
      @keydown="handleKeydown"
      @input="handleInput"
      :placeholder="placeholder"
    >
      {{ amount }}
    </span>
  </div>
</template>

<style scoped lang="scss">
[contenteditable]:focus {
  outline: none;
  border-bottom: solid 2px $gray-900;
}

[contenteditable]:before {
  content: '$';
  margin-right: 0.25rem;
  vertical-align: text-top;
  font-size: map-get($font-sizes, 4xl);
}

[contenteditable]:empty {
  color: $gray-100;
  &:after {
    content: attr(placeholder);
    pointer-events: none;
    font-weight: 900;
  }
}
</style>
