import type { MaybeElementRef, MaybeRefOrGetter, Position } from '@vueuse/core'
import { toValue, useEventListener, useThrottleFn } from '@vueuse/core'
import type { Ref } from 'vue'
import { computed, ref, watch, watchEffect } from 'vue'

import { useCursors } from './cursor'
import type { Edge, ResizableConfig, ResizableConfigResolved, ResizableEl } from '@/types'
import { isInAround, isInEdge, parseConfig, renderBorder, updateSize } from '@/utils'

function shouldRenderBorder(config: ResizableConfig['border']) {
  return (typeof config === 'object' && config.render) || config
}

let globalId = 0

/**
 * Only one resizable element can be operated at the same time
 */
const operatingId = ref<number | null>(null)

export function useResizable(el: MaybeElementRef<ResizableEl | null>, resizableConfig?: MaybeRefOrGetter<ResizableConfig>) {
  const id = ++globalId

  const config = computed(() => {
    return parseConfig(toValue(resizableConfig))
  })

  const size = ref({} as ReturnType<typeof updateSize>)
  const paused = computed(() => !!operatingId.value && operatingId.value !== id)

  const payload = registerPointerEvents(el, toValue(config), paused, {
    handlePointerMove: () => {
      if (!toValue(el))
        return
      size.value = updateSize({
        el: toValue(el)!,
        deltaPosition: toValue(payload!.deltaPosition),
        type: toValue(payload!.moveType)!,
        config: config.value,
      })
    },
    handlePointerUp: () => {
      operatingId.value = null
    },
    handleDragAbilityChange: (canDrag) => {
      if (canDrag)
        operatingId.value = id
    },
  })

  watch(() => size.value, (newSize) => {
    config.value.onSizeChange?.({
      width: newSize.w,
      height: newSize.h,
    })
  })

  watch(() => toValue(el), (element) => {
    if (!element)
      return
    if (shouldRenderBorder(config.value.border))
      renderBorder(element, config.value, payload.moveType)
  }, { immediate: true })

  return { ...payload, size }
}

const currentActiveEl = ref<ResizableEl | null>(null)

interface PointerEventHandlers {
  handlePointerMove?: (e: MouseEvent) => void
  handlePointerDown?: (e: MouseEvent) => void
  handlePointerUp?: (e: MouseEvent) => void
  handlePointerLeave?: (e: MouseEvent) => void
  handleDragAbilityChange?: (canDrag: boolean) => void
}

export function registerPointerEvents(
  el: MaybeElementRef<HTMLElement | null>,
  config: ResizableConfigResolved,
  paused: Ref<boolean>,
  handlers?: PointerEventHandlers,
  isIgnoreEdgeCheck = false,
) {
  const {
    handlePointerMove,
    handlePointerDown,
    handlePointerUp,
    handlePointerLeave,
    handleDragAbilityChange,
  } = handlers ?? {
    handlePointerDown: undefined,
    handlePointerLeave: undefined,
    handlePointerMove: undefined,
    handlePointerUp: undefined,
    handleDragAbilityChange: undefined,
  }

  const isDragging = ref(false)
  const canDrag = ref(false)
  const moveType = ref<Edge | null>(null)
  const previousPosition = ref<Position>({ x: 0, y: 0 })
  const deltaPosition = ref<Position>({ x: 0, y: 0 })

  watchEffect(() => {
    if (paused.value)
      return
    handleDragAbilityChange?.(canDrag.value)
  })

  watch(() => toValue(el), (element) => {
    if (!element)
      return
    const { updateCursor, resetCursor } = useCursors(config.edge)

    const listenEl = window.document.body

    useEventListener(listenEl, 'pointermove', useThrottleFn((e: MouseEvent) => {
      if (paused.value)
        return
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
      const { aroundX, aroundY } = isInAround(element, x, y, config.tolerance)
      if (aroundX && aroundY) {
        if (!isIgnoreEdgeCheck) {
          const result = isInEdge(element, x, y, config.tolerance)
          const [type, cursor] = updateCursor(result)
          canDrag.value = !!cursor
          moveType.value = type
        }
        else {
          updateCursor(true)
          canDrag.value = true
        }

        currentActiveEl.value = element
      }
      else {
        if (currentActiveEl.value === element) {
          resetCursor()
          canDrag.value = false
          moveType.value = null
          currentActiveEl.value = null
          window.document.body.style.userSelect = 'auto'
        }
      }
    }, config.throttleTime))

    useEventListener(listenEl, 'pointerdown', (e: MouseEvent) => {
      if (paused.value)
        return
      if (e.button !== 0) // ignore non-left click down
        return
      if (!canDrag.value)
        return
      isDragging.value = true
      previousPosition.value = { x: e.clientX, y: e.clientY }
      handlePointerDown?.(e)
    })

    useEventListener(listenEl, 'pointerup', (e: MouseEvent) => {
      if (paused.value)
        return
      isDragging.value = false
      handlePointerUp?.(e)
    })

    useEventListener(listenEl, 'pointerleave', (e: MouseEvent) => {
      if (paused.value)
        return
      isDragging.value = false
      handlePointerLeave?.(e)
    })
  }, {
    immediate: true,
  })

  return {
    isDragging,
    canDrag,
    moveType,
    deltaPosition,
    previousPosition,
  }
}
