<script setup>
import Resizable from '../components/directives/Resizable.vue'
import CustomBorder from '../components/directives/ResizableCustomBorder.vue'
</script>

# `v-resizable`

Also provide a `component` version: [`Resizable`](/comps/resizable).

## Preview

<Resizable />

```vue
<script setup lang="ts">
import { vResizable } from 'vue-resizables'

// optional if only need the logic
import 'vue-resizables/style'
</script>

<template>
  <div
    v-resizable="{
      edge: {
        bottom: true,
        left: true,
      },
      border: true,
    }"
  />
</template>
```

Or you can globally register this directive(but will lose the type support):

```ts
import { vResizable } from 'vue-resizables'
import 'vue-resizables/style'

createApp(App).directive('resizable', vResizable).mount('#app')
```

## Config

See [config](/config/resizable) for more details.
## Custom border

<CustomBorder />

```vue
<template>
  <div
    v-resizable="{
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
    }"
  />
</template>
```
