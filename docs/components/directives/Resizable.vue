<script setup lang="ts">
import {  ref } from 'vue'
import { vResizable } from '@/directives'
import { useElementSize } from '@vueuse/core';

const el = ref<HTMLElement | null>(null)

const { width, height } = useElementSize(el)
</script>
<template>
  <div ref="el" class="template" v-resizable="{
    edge: {
      bottom: true,
      right: true,
    },
    renderBorder: true
  }">
    width: {{ width }}<br>
    height: {{ height }}
  </div>
</template>
<style scoped>
.template {
  width: 300px;
  height: 300px;
  background-color: #42B88345;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
</style>
