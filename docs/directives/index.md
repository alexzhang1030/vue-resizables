<script setup>
import Resizable from '../components/directives/Resizable.vue'
</script>

# Directives

## `v-resizable`

<Resizable />

```vue
<script setup lang="ts">
import { vResizable } from 'vue-resizables'
</script>
<template>
  <div v-resizable:edge.right.bottom></div>
</template>
```

### Options

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