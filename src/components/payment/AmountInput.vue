<script setup lang="ts">
import { ref } from 'vue';
import { defineModel } from 'vue';

defineProps<{
  placeholder?: string;
  hint?: string;
}>();

const input = ref<string>('');
const amount = defineModel<number>();

defineExpose({
  clear: () => {
    input.value = '';
    amount.value = 0;
  },
});

function handleKeypress(e: KeyboardEvent) {
  const { innerText } = e.target as HTMLInputElement;
  // if not 0-9 or '.'
  // and result isn't a valid number
  if (
    ((e.key.charCodeAt(0) < 48 || e.key.charCodeAt(0) > 57) && e.key !== '.') ||
    !Number(innerText + e.key)
  ) {
    e.preventDefault();
  }
}

function handleInput(e: Event) {
  input.value = (e.target as HTMLInputElement).innerText;
  const newNum = Number(input.value);
  amount.value = !isNaN(newNum) && input.value.trim() !== '' ? newNum : 0;
}
</script>

<template>
  <div class="column items-center">
    {{ hint }}
    <span
      :class="[
        'text-7xl text-weight-bold',
        { empty: input === '', error: isNaN(Number(input)) },
      ]"
      role="textbox"
      contenteditable
      @keypress="handleKeypress"
      @input="handleInput"
      :placeholder="placeholder"
    >
      {{ input }}
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
  color: $gray-900;
  border-bottom: solid 2px transparent;

  &:focus {
    outline: none;
    border-color: currentColor;
  }

  &:before {
    content: '$';
    margin-right: 0.25rem;
    vertical-align: text-top;
    font-size: map-get($font-sizes, 4xl);
  }

  &.empty {
    color: $gray-100;
    &:after {
      content: attr(placeholder);
      pointer-events: none;
      font-weight: 900;
    }
  }

  &.error {
    color: $negative;
  }

  :deep(br) {
    display: none;
  }
}
</style>
