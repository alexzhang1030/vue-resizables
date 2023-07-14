<script setup lang="ts">
</script>

<template>
  <div class="template" v-resizable="{
    edge: {
      bottom: true,
      right: true,
    },
    renderBorder: true
  }">

  </div>
</template>

<style>
  .template {
    width: 500px;
    height: 500px;
    background-color: gray;
  }
</style>
