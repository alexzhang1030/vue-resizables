import { ref } from 'vue'
import { useEventListener, useThrottleFn } from '@vueuse/core'
import { useCursors } from './cursor'
import { type ResizableConfig, parseConfig } from './config'
import { updatePosition } from './position'
import { renderBorder } from './border'
import type { Edge } from '@/utils'
import { isInEdge } from '@/utils'

export type ResizableEl = HTMLElement

function shouldRenderBorder(config: ResizableConfig['border']) {
  return (typeof config === 'object' && config.render) || config
}

export function useResizable(el: ResizableEl, resizableConfig: ResizableConfig) {
  const config = parseConfig(resizableConfig)

  const isDragging = ref(false)
  const canDrag = ref(false)
  const moveType = ref<Edge | null>(null)
  const previousPosition = ref({ x: 0, y: 0 })

  if (shouldRenderBorder(resizableConfig.border))
    renderBorder(el, config, moveType)

  const { updateCursor } = useCursors(config.edge)

  const listenEl = window.document.body

  useEventListener(listenEl, 'pointermove', useThrottleFn((e: MouseEvent) => {
    if (isDragging.value) {
      updateCursor(true)
      window.document.body.style.userSelect = 'none'
      updatePosition({
        el,
        e,
        type: moveType.value!,
        initialPosition: previousPosition.value,
        config: config.edge,
      })
      previousPosition.value = { x: e.x, y: e.y }
      return
    }
    window.document.body.style.userSelect = 'auto'
    const { x, y } = e
    const result = isInEdge(el, x, y)
    const [type, cursor] = updateCursor(result)
    canDrag.value = !!cursor
    moveType.value = type
  }, config.throttleTime))

  useEventListener(listenEl, 'pointerdown', (e: MouseEvent) => {
    if (e.button !== 0) // ignore non-left click down
      return
    if (!canDrag.value)
      return
    isDragging.value = true
    previousPosition.value = { x: e.x, y: e.y }
  })
  useEventListener(listenEl, 'pointerup', () => {
    isDragging.value = false
  })
  useEventListener(listenEl, 'pointerleave', () => {
    isDragging.value = false
  })
}
