<script setup lang="ts">
import { ref } from 'vue'
import { useElementSize } from '@vueuse/core'
import { vResizable } from '@/directives'

const el = ref<HTMLElement | null>(null)

const { width, height } = useElementSize(el)
</script>

<template>
  <div
    id="#ResizableCustomBorder"
    ref="el" v-resizable="{
      edge: {
        bottom: true,
        right: true,
      },
      border: {
        render: true,
        style: {
          headless: true,
          class: 'bg-lightblue',
          size: 2,
        },
      },
    }" class="w-300px h-300px bg-#42B88345 flex justify-center items-center flex-wrap"
  >
    width: {{ width }}<br>
    height: {{ height }}
  </div>
</template>
