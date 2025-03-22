<script setup lang="ts"></script>

<template>
  <q-layout>
    <q-page-container class="padding">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped lang="scss">
.padding {
  padding: 12px;

  @media (min-width: $breakpoint-md-min) {
    padding: 24px;
  }
}
</style>
