<script setup lang="ts">
</script>

<template>
  <div
    v-resizable="{
      edge: {
        bottom: true,
        right: true,
      },
      renderBorder: true,
    }" class="template"
  />
</template>

<style>
  .template {
    width: 500px;
    height: 500px;
    background-color: gray;
  }
</style>
