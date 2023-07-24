import { ref } from 'vue'
import { useEventListener, useThrottleFn } from '@vueuse/core'
import { useCursors } from './cursor'
import { parseConfig } from './config'
import type { ResizableConfig, ResizableConfigResolved } from './config'
import { renderBorder } from './border'
import { updateSize } from './size'
import type { Edge } from '@/utils'
import { isInAround, isInEdge } from '@/utils'

export interface Position { x: number; y: number }

export type ResizableEl = HTMLElement

function shouldRenderBorder(config: ResizableConfig['border']) {
  return (typeof config === 'object' && config.render) || config
}

export function useResizable(el: ResizableEl, resizableConfig: ResizableConfig) {
  const config = parseConfig(resizableConfig)

  const { moveType, deltaPosition } = registerPointerEvents(el, config, {
    handlePointerMove: () => updateSize({
      el,
      deltaPosition: deltaPosition.value,
      type: moveType.value!,
      config,
    }),
  })

  if (shouldRenderBorder(resizableConfig.border))
    renderBorder(el, config, moveType)
}

const currentActiveEl = ref<ResizableEl | null>(null)

interface PointerEventHandlers {
  handlePointerMove?: (e: MouseEvent) => void
  handlePointerDown?: (e: MouseEvent) => void
  handlePointerUp?: (e: MouseEvent) => void
  handlePointerLeave?: (e: MouseEvent) => void
}

export function registerPointerEvents(el: HTMLElement, config: ResizableConfigResolved, handlers?: PointerEventHandlers) {
  const {
    handlePointerMove,
    handlePointerDown,
    handlePointerUp,
    handlePointerLeave,
  } = handlers ?? {
    handlePointerDown: undefined,
    handlePointerLeave: undefined,
    handlePointerMove: undefined,
    handlePointerUp: undefined,
  }

  const isDragging = ref(false)
  const canDrag = ref(false)
  const moveType = ref<Edge | null>(null)
  const previousPosition = ref<Position>({ x: 0, y: 0 })
  const deltaPosition = ref<Position>({ x: 0, y: 0 })

  const { updateCursor, resetCursor } = useCursors(config.edge)

  const listenEl = window.document.body

  useEventListener(listenEl, 'pointermove', useThrottleFn((e: MouseEvent) => {
    const { clientX: x, clientY: y } = e

    if (isDragging.value) {
      updateCursor(true)
      window.document.body.style.userSelect = 'none'
      deltaPosition.value = { x: x - previousPosition.value.x, y: y - previousPosition.value.y }
      previousPosition.value = { x, y }
      handlePointerMove?.(e)
      return
    }

    // only check when cursor is around the element
    const { aroundX, aroundY } = isInAround(el, x, y)
    if (aroundX && aroundY) {
      const result = isInEdge(el, x, y)
      const [type, cursor] = updateCursor(result)
      canDrag.value = !!cursor
      moveType.value = type
      currentActiveEl.value = el
    }
    else {
      if (currentActiveEl.value === el) {
        resetCursor()
        canDrag.value = false
        moveType.value = null
        currentActiveEl.value = null
        window.document.body.style.userSelect = 'auto'
      }
    }
  }, config.throttleTime))

  useEventListener(listenEl, 'pointerdown', (e: MouseEvent) => {
    if (e.button !== 0) // ignore non-left click down
      return
    if (!canDrag.value)
      return
    isDragging.value = true
    previousPosition.value = { x: e.clientX, y: e.clientY }
    handlePointerDown?.(e)
  })

  useEventListener(listenEl, 'pointerup', (e: MouseEvent) => {
    isDragging.value = false
    handlePointerUp?.(e)
  })

  useEventListener(listenEl, 'pointerleave', (e: MouseEvent) => {
    isDragging.value = false
    handlePointerLeave?.(e)
  })

  return {
    isDragging,
    canDrag,
    moveType,
    deltaPosition,
    previousPosition,
  }
}
