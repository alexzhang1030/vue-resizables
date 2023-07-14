import { ref } from 'vue'
import { useEventListener } from '@vueuse/core'
import { useCursors } from './cursor'
import { type ResizableConfig, parseConfig } from './config'
import { updatePosition } from './position'
import { renderBorder } from './border'
import type { Edge } from '@/utils'
import { isInEdge } from '@/utils'

export type ResizableEl = HTMLElement

export function useResizable(el: ResizableEl, rawConfig: ResizableConfig) {
  const config = parseConfig(rawConfig)

  const isDragging = ref(false)
  const canDrag = ref(false)
  const moveType = ref<Edge | null>(null)
  const previousPosition = ref({ x: 0, y: 0 })

  if (config.renderBorder)
    renderBorder(el, config.edge, moveType)

  const { updateCursor } = useCursors(config.edge)

  useEventListener('pointermove', (e: MouseEvent) => {
    if (isDragging.value) {
      updateCursor(true)
      window.document.body.style.userSelect = 'none'
      updatePosition({
        el,
        e,
        type: moveType.value!,
        initialPosition: previousPosition.value,
        postUpdate: (x, y) => {
          previousPosition.value = { x, y }
        },
        config: config.edge,
      })
      return
    }
    window.document.body.style.userSelect = 'auto'
    const { x, y } = e
    const result = isInEdge(el, x, y)
    const [type, cursor] = updateCursor(result)
    canDrag.value = !!cursor
    moveType.value = type
  })
  useEventListener('pointerdown', (e) => {
    if (!canDrag.value)
      return
    isDragging.value = true
    previousPosition.value = { x: e.x, y: e.y }
  })
  useEventListener('pointerup', () => {
    isDragging.value = false
  })
  useEventListener('pointerleave', () => {
    isDragging.value = false
  })
}
