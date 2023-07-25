import type { IsInEdgeResult } from '@/types'
import { BaseEdge, ExtendedEdge } from '@/types'

const TOLERANCE = 5

export function isInAround(el: HTMLElement, x: number, y: number) {
  const { left, right, top, bottom } = el.getBoundingClientRect()
  const aroundY = (y - bottom) < TOLERANCE && (y - top) > -TOLERANCE
  const aroundX = (x - right) < TOLERANCE && (x - left) > -TOLERANCE
  return {
    aroundX,
    aroundY,
  }
}

export function isInEdge(element: HTMLElement, x: number, y: number): IsInEdgeResult {
  const { left, right, top, bottom } = element.getBoundingClientRect()
  const abs = Math.abs

  const { aroundX, aroundY } = isInAround(element, x, y)

  const result = {
    [BaseEdge.LEFT]: (abs(x - left) < TOLERANCE) && aroundY,
    [BaseEdge.RIGHT]: (abs(x - right) < TOLERANCE) && aroundY,
    [BaseEdge.TOP]: (abs(y - top) < TOLERANCE) && aroundX,
    [BaseEdge.BOTTOM]: (abs(y - bottom) < TOLERANCE) && aroundX,
  }
  return {
    ...result,
    [ExtendedEdge.TOP_LEFT]: result[BaseEdge.LEFT] && result[BaseEdge.TOP],
    [ExtendedEdge.TOP_RIGHT]: result[BaseEdge.RIGHT] && result[BaseEdge.TOP],
    [ExtendedEdge.BOTTOM_LEFT]: result[BaseEdge.LEFT] && result[BaseEdge.BOTTOM],
    [ExtendedEdge.BOTTOM_RIGHT]: result[BaseEdge.RIGHT] && result[BaseEdge.BOTTOM],
  }
}
