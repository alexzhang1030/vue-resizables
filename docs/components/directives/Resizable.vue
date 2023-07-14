<script setup lang="ts">
import {  ref } from 'vue'
import { vResizable } from '@/directives'
import { useElementSize } from '@vueuse/core';

const el = ref<HTMLElement | null>(null)

const { width, height } = useElementSize(el)
</script>
<template>
  <div class="p">
    <div ref="el" class="template" v-resizable:edge.right.bottom>
      width: {{ width }}<br>
      height: {{ height }}
    </div>
  </div>
</template>
<style scoped>
.p {
  width: 300px;
  height: 500px;
}
.template {
  width: 300px;
  height: 300px;
  background-color: lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
</style>
