import { type Directive, ref } from 'vue'
import { useEventListener } from '@vueuse/core'
import { Edge, isInEdge } from '@/utils'

const cursors: [Edge, string][] = [
  [Edge.TOP_LEFT, 'nwse-resize'],
  [Edge.TOP_RIGHT, 'nesw-resize'],
  [Edge.BOTTOM_LEFT, 'nesw-resize'],
  [Edge.BOTTOM_RIGHT, 'nwse-resize'],
  [Edge.LEFT, 'ew-resize'],
  [Edge.RIGHT, 'ew-resize'],
  [Edge.TOP, 'ns-resize'],
  [Edge.BOTTOM, 'ns-resize'],
]

type PosFn = (
  size: { width: number; height: number },
  pos: { x: number; y: number },
  previous: { x: number; y: number }
) => { width: number; height: number }

const fns: Record<Edge, PosFn> = {
  [Edge.LEFT]: ({ width, height }, { x }, { x: px }) => ({ width: width + (x + px), height }),
  [Edge.RIGHT]: ({ width, height }, { x }, { x: px }) => ({ width: width + (x - px), height }),
  [Edge.TOP]: ({ height, width }, { y }, { y: py }) => ({ width, height: height + (y + py) }),
  [Edge.BOTTOM]: ({ height, width }, { y }, { y: py }) => ({ width, height: height + (y - py) }),
  [Edge.TOP_LEFT]: ({ width, height }, { x, y }, { x: px, y: py }) => ({
    width: width + (x + px),
    height: height + (y + py),
  }),
  [Edge.TOP_RIGHT]: ({ width, height }, { x, y }, { x: px, y: py }) => ({
    width: width + (x - px),
    height: height + (y + py),
  }),
  [Edge.BOTTOM_LEFT]: ({ width, height }, { x, y }, { x: px, y: py }) => ({
    width: width + (x + px),
    height: height + (y - py),
  }),
  [Edge.BOTTOM_RIGHT]: ({ width, height }, { x, y }, { x: px, y: py }) => ({
    width: width + (x - px),
    height: height + (y - py),
  }),
}

export const Resizable: Directive<HTMLElement> = {
  beforeMount(el, binding) {
    useDragging(el)
  },
}

function useDragging(el: HTMLElement) {
  const isDragging = ref(false)
  const inPosition = ref(false)
  const moveType = ref<Edge | null>(null)
  const previousPosition = ref({ x: 0, y: 0 })

  let oldCursor = ''
  useEventListener('pointermove', (e: MouseEvent) => {
    if (isDragging.value) {
      return usePosition(el, e, moveType.value!, previousPosition.value, (x, y) => {
        previousPosition.value = { x, y }
      })
    }
    if (!oldCursor)
      oldCursor = getComputedStyle(document.body).getPropertyValue('cursor')
    const { x, y } = e
    const result = isInEdge(el, x, y)
    const [type, cursor] = cursors.find(([edge]) => result[edge]) ?? [null, null]
    document.body.style.cursor = cursor ?? oldCursor
    inPosition.value = !!cursor
    moveType.value = type
  })
  useEventListener('pointerdown', (e) => {
    if (!inPosition.value)
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
