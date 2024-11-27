<script setup lang="ts">
import { vResizable } from '@/directives'
import { useElementSize } from '@vueuse/core'
import { ref } from 'vue'

const el = ref<HTMLElement | null>(null)

const { width, height } = useElementSize(el)
</script>

<template>
  <div class="flex justify-end w-full">
    <div
      ref="el" v-resizable="{
        edge: {
          left: true,
        },
        border: true,
      }" class="w-300px h-300px bg-#42B88345 flex justify-center items-center flex-wrap"
    >
      width: {{ width }}<br>
      height: {{ height }}
    </div>
  </div>
</template>
