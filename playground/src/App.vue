<script setup lang="ts">
import { vResizable } from 'vue-resizables'
import 'vue-resizables/style'
</script>

<template>
  <div class="w-100vw h-100vh flex justify-center items-center">
    <div
      v-resizable="{
        edge: {
          bottom: true,
          right: true,
          left: true,
          top: true,
        },
        border: {
          render: true,
          style: {
            headless: true,
            size: 2,
            color: 'red',
          },
        },
      }"
      class="w-300px h-300px bg-lightblue-1"
    >
      <p>hello</p>
    </div>
  </div>
</template>
