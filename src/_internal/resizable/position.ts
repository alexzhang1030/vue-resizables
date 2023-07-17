import type { ResizableConfig } from './config'
import type { Edge } from '@/utils'
import { BaseEdge, ExtendedEdge } from '@/utils'

type PosFn = (
  size: { width: number; height: number },
  pos: { x: number; y: number },
  previous: { x: number; y: number }
) => { width: number; height: number }

const getPosFns: (config: ResizableConfig['edge']) => Record<Edge, PosFn> = config => ({
  [BaseEdge.LEFT]: ({ width, height }, { x }, { x: px }) => ({ width: width + (px - x), height }),
  [BaseEdge.RIGHT]: ({ width, height }, { x }, { x: px }) => ({ width: width + (x - px), height }),
  [BaseEdge.TOP]: ({ height, width }, { y }, { y: py }) => ({ width, height: height + (py - y) }),
  [BaseEdge.BOTTOM]: ({ height, width }, { y }, { y: py }) => ({ width, height: height + (y - py) }),
  [ExtendedEdge.TOP_LEFT]: ({ width, height }, { x, y }, { x: px, y: py }) => ({
    width: config[BaseEdge.LEFT] ? width + (px - x) : width,
    height: config[BaseEdge.TOP] ? height + (py - y) : height,
  }),
  [ExtendedEdge.TOP_RIGHT]: ({ width, height }, { x, y }, { x: px, y: py }) => ({
    width: config[BaseEdge.RIGHT] ? width + (x - px) : width,
    height: config[BaseEdge.TOP] ? height + (py - y) : height,
  }),
  [ExtendedEdge.BOTTOM_LEFT]: ({ width, height }, { x, y }, { x: px, y: py }) => ({
    width: config[BaseEdge.LEFT] ? width + (px - x) : width,
    height: config[BaseEdge.BOTTOM] ? height + (y - py) : height,
  }),
  [ExtendedEdge.BOTTOM_RIGHT]: ({ width, height }, { x, y }, { x: px, y: py }) => ({
    width: config[BaseEdge.RIGHT] ? width + (x - px) : width,
    height: config[BaseEdge.BOTTOM] ? height + (y - py) : height,
  }),
})

export function updatePosition({
  el, e, type, initialPosition, config,
}: {
  el: HTMLElement
  e: MouseEvent
  type: Edge
  initialPosition: { x: number; y: number }
  config: ResizableConfig['edge']
},

) {
  const { width, height } = el.getBoundingClientRect()
  const { clientX, clientY } = e
  const posFns = getPosFns(config)
  const { width: finalWidth, height: finalHeight } = posFns[type]({ width, height }, { x: clientX, y: clientY }, initialPosition)
  el.style.width = `${finalWidth}px`
  el.style.height = `${finalHeight}px`
}
