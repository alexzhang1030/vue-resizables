import { ref } from 'vue'
import { useEventListener } from '@vueuse/core'
import { fns } from './data'
import { useCursors } from './cursor'
import { type ResizableConfig, parseConfig } from './config'
import type { Edge } from '@/utils'
import { isInEdge } from '@/utils'

export type ResizableEl = HTMLElement

export function useResizable(el: ResizableEl, rawConfig: ResizableConfig) {
  const config = parseConfig(rawConfig)

  const isDragging = ref(false)
  const canDrag = ref(false)
  const moveType = ref<Edge | null>(null)
  const previousPosition = ref({ x: 0, y: 0 })

  const { updateCursor } = useCursors(config.edge)

  useEventListener('pointermove', (e: MouseEvent) => {
    if (isDragging.value) {
      updateCursor(true)
      window.document.body.style.userSelect = 'none'
      return usePosition(el, e, moveType.value!, previousPosition.value, (x, y) => {
        previousPosition.value = { x, y }
      })
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

function usePosition(
  el: HTMLElement, e: MouseEvent,
  type: Edge, initialPosition: { x: number; y: number },
  postUpdate: (x: number, y: number) => void,
) {
  const { width, height } = el.getBoundingClientRect()
  const { x, y } = e
  const { width: finalWidth, height: finalHeight } = fns[type]({ width, height }, { x, y }, initialPosition)
  el.style.width = `${finalWidth}px`
  el.style.height = `${finalHeight}px`
  postUpdate(x, y)
}
