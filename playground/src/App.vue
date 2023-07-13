<script setup lang="ts">
import { Resizable as vResizable } from 'vue-resizables'
</script>

<template>
  <div class="template" v-resizable>

  </div>
</template>

<style>
  .template {
    width: 500px;
    height: 500px;
    background-color: gray;
  }
</style>
