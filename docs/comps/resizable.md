<script setup>
import Resizable from '../components/components/Resizable.vue'
</script>

# `Resizable`

The `component` version of the [`vResizable`](/directives/) directive.

## Preview

<Resizable />

```vue
<script setup lang="ts">
import { Resizable } from 'vue-resizables'
</script>
<template>
  <Resizable class="w-300px h-300px" :config="{
    edge: {
      right: true,
      bottom: true
    },
    renderBorder: true
  }">
    <div class="w-full h-full">
      <!-- content -->
    </div>
  </Resizable>
</template>
```