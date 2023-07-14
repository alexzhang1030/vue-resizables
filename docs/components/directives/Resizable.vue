<script setup lang="ts">
import {  ref } from 'vue'
import { vResizable } from '@/directives'
import { useElementSize } from '@vueuse/core';

const el = ref<HTMLElement | null>(null)

const { width, height } = useElementSize(el)
</script>
<template>
  <div ref="el" v-resizable="{
    edge: {
      bottom: true,
      right: true,
    },
    renderBorder: true
  }" class="w-300px h-300px bg-#42B88345 flex justify-center items-center flex-wrap">
    width: {{ width }}<br>
    height: {{ height }}
  </div>
</template>
