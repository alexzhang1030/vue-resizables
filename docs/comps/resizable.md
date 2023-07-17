<script setup>
import Resizable from '../components/components/Resizable.vue'
</script>

# `Resizable`

The `component` version of the [`vResizable`](/directives/) directive.

## Preview

<Resizable />

::: tip
The children of `Resizable` should always be a single element, and the width and height of the element should be `100%`.

Config the width and height of the `Resizable` component instead of the children element.
:::

```vue
<script setup lang="ts">
import { Resizable } from 'vue-resizables'
</script>

<template>
  <Resizable
    class="w-300px h-300px" :config="{
      edge: {
        right: true,
        bottom: true,
      },
      border: true,
    }"
  >
    <div class="w-full h-full">
      <!-- content -->
    </div>
  </Resizable>
</template>
```