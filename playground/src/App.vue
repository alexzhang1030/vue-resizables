<script setup lang="ts">
import { vResizable } from 'vue-resizables'
import 'vue-resizables/style'
</script>

<template>
  <div
    v-resizable="{
      edge: {
        bottom: true,
        right: true,
      },
      border: true,
    }" class="template"
  >
    <p>hello</p>
  </div>
</template>

<style>
  .template {
    width: 500px;
    height: 500px;
    background-color: gray;
  }
</style>
