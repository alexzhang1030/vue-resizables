<script setup>
import Resizable from '../components/directives/Resizable.vue'
</script>

# `v-resizable` 

## Preview

<Resizable />

```vue
<script setup lang="ts">
import { vResizable } from 'vue-resizables'
// optional if only need the logic
import 'vue-resizables/style'
</script>
<template>
  <div v-resizable="{
    edge: {
      bottom: true,
      right: true,
    },
    renderBorder: true
  }"></div>
</template>
```

## Config 

| Name          | Type                    | Default              |
| ------------- | ----------------------- | -------------------- |
| edge          | `Record<Edge, boolean>` | `Record<Edge, false>` |
| renderBorder  | `boolean`               | `false`              |

### `edge`

By default, the edges of the element are _not_ resizable. You should pass the edges that you want to resize:

Allowed edges:

- `top`
- `right`
- `bottom`
- `left`

And the corners(will auto enabled if you enable the related edges):

- `top-left`
- `top-right`
- `bottom-left`
- `bottom-right`

e.g. `v-resizable:edge.top.left.right-bottom`:

will enable:

- `top`
- `left`
- `top-left`
- `right-bottom`

### `renderBorder`

> `required import 'vue-resizables/style'` to work.

If `true`, the border of the element will be rendered. 