import type { Edge } from '@/utils'
import { BaseEdge, ExtendedEdge } from '@/utils'

export type PosFn = (
  size: { width: number; height: number },
  pos: { x: number; y: number },
  previous: { x: number; y: number }
) => { width: number; height: number }

export const fns: Record<Edge, PosFn> = {
  [BaseEdge.LEFT]: ({ width, height }, { x }, { x: px }) => ({ width: width + (px - x), height }),
  [BaseEdge.RIGHT]: ({ width, height }, { x }, { x: px }) => ({ width: width + (x - px), height }),
  [BaseEdge.TOP]: ({ height, width }, { y }, { y: py }) => ({ width, height: height + (py - y) }),
  [BaseEdge.BOTTOM]: ({ height, width }, { y }, { y: py }) => ({ width, height: height + (y - py) }),
  [ExtendedEdge.TOP_LEFT]: ({ width, height }, { x, y }, { x: px, y: py }) => ({
    width: width + (px - x),
    height: height + (py - y),
  }),
  [ExtendedEdge.TOP_RIGHT]: ({ width, height }, { x, y }, { x: px, y: py }) => ({
    width: width + (x - px),
    height: height + (py - y),
  }),
  [ExtendedEdge.BOTTOM_LEFT]: ({ width, height }, { x, y }, { x: px, y: py }) => ({
    width: width + (px - x),
    height: height + (y - py),
  }),
  [ExtendedEdge.BOTTOM_RIGHT]: ({ width, height }, { x, y }, { x: px, y: py }) => ({
    width: width + (x - px),
    height: height + (y - py),
  }),
}
