<script setup lang="ts">
import { defineModel } from 'vue';

defineProps<{
  placeholder?: string;
  hint?: string;
}>();

const amount = defineModel<number>();
function handleKeydown(e: KeyboardEvent) {
  const leigalInput = [
    '.',
    ...Array(10)
      .fill(0)
      .map((e, i) => `${i}`),
  ];

  const allowedKeys = [
    'Backspace',
    'ArrowLeft',
    'ArrowRight',
    'Delete',
    ...leigalInput,
  ];
  const { innerText } = e.target as HTMLInputElement;
  const newInput = leigalInput.includes(e.key) ? innerText + e.key : innerText;

  if (
    (!e.ctrlKey && !e.metaKey && !allowedKeys.includes(e.key)) ||
    isNaN(Number(newInput))
  ) {
    e.preventDefault();
  }
}

function handleInput(e: Event) {
  const { innerText } = e.target as HTMLInputElement;
  const newNum = Number(innerText);
  amount.value = !isNaN(newNum) && innerText.trim() !== '' ? newNum : undefined;
}
</script>

<template>
  <div class="column items-center">
    {{ hint }}
    <span
      :class="['text-7xl text-weight-bold', { empty: amount === undefined }]"
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
div {
  color: $gray-700;
  font-size: map-get($font-sizes, $key: lg);
  font-weight: 700;
}

[contenteditable] {
  color: black;
  &:focus {
    outline: none;
    border-bottom: solid 2px $gray-900;
  }
}

[contenteditable]:before {
  content: '$';
  margin-right: 0.25rem;
  vertical-align: text-top;
  font-size: map-get($font-sizes, 4xl);
}

[contenteditable].empty {
  color: $gray-100;
  &:after {
    content: attr(placeholder);
    pointer-events: none;
    font-weight: 900;
  }
}
</style>
