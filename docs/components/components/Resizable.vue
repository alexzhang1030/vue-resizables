<script setup lang="ts">
import { ref } from 'vue'
import { Resizable } from '@/components'
import { useElementSize } from '@vueuse/core';

const el = ref<HTMLElement | null>(null)
const { width, height } = useElementSize(el)
</script>
<template>
  <Resizable class="w-300px h-300px" :config="{
    edge: {
      right: true,
      bottom: true
    },
    renderBorder: true
  }">
    <div ref="el" class="bg-#42B88345 flex justify-center items-center flex-wrap w-full h-full">
      width: {{ width }}<br>
      height: {{ height }}
    </div>
  </Resizable>
</template>
