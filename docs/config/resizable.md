# Resizable Config

## default config

```ts
export const defaultConfig: ResizableConfig = {
  edge: {
    [BaseEdge.LEFT]: false,
    [BaseEdge.TOP]: false,
    [BaseEdge.RIGHT]: false,
    [BaseEdge.BOTTOM]: false,
    [ExtendedEdge.TOP_LEFT]: false,
    [ExtendedEdge.TOP_RIGHT]: false,
    [ExtendedEdge.BOTTOM_LEFT]: false,
    [ExtendedEdge.BOTTOM_RIGHT]: false,
  },
  border: false,
  throttleTime: 15,
}
```

## edge

- Type: `Record<Edge, boolean>`
- Default: `Record<Edge, false>`

::: warning
By default, the edges of the element are _not_ resizable. You should pass the edges that you want to resize:
:::

All edges:

- `top`
- `right`
- `bottom`
- `left`

And the extended edges:

- `top-left`
- `top-right`
- `bottom-left`
- `bottom-right`

::: tip
Will auto enable extended edge if enabled the related edge
:::

E.g.

```ts
const config = {
  edge: {
    'left': true,
    'top': true,
    'right-bottom': true
  }
}
```

Will enable the edges:

- `left`
- `top`
- `top-left` (auto enabled)
- `right-bottom`

## border

- Type: `boolean` or `BorderConfig`
- Default: `false`

> **required** `import 'vue-resizables/style` to work.

Render the border of the edge to alert the user that the edge is resizable.

### `border.render`

- Type: `boolean`

Render the border or not.

### `border.style.headless`

- Type: `boolean`

Use default style or not.

### `border.style.color`

- Type: `string`

The color of the border.

### `border.style.class`

- Type: `string`

The class of the border.

### `border.style.size`

- Type: `number`

The size(width/height) of the border.

## throttleTime

- Type: `number`
- Default: `15`

The throttle time of the resize event.

## size

Set the min/max size of the ResizableElement.

Allowed these syntaxes:

- `number`: `100`
- `string`:
  - `'100%'`
  - `'100vw` / `100vh'`

### `size.min.width`

- Type: `number`
- Default: 0

### `size.min.height`

- Type: `number`
- Default: 0

### `size.max.width`

- Type: `number`
- Default: `Number.POSITIVE_INFINITY`

### `size.max.height`

- Type: `number`
- Default: `Number.POSITIVE_INFINITY`