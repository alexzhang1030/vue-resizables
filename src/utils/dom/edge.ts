import type { IsInEdgeResult } from '@/types'
import { BaseEdge, ExtendedEdge } from '@/types'

export function isInAround(el: HTMLElement, x: number, y: number, tolerance: number) {
  const { left, right, top, bottom } = el.getBoundingClientRect()
  const aroundY = (y - bottom) < tolerance && (y - top) > -tolerance
  const aroundX = (x - right) < tolerance && (x - left) > -tolerance
  return {
    aroundX,
    aroundY,
  }
}

export function isInEdge(element: HTMLElement, x: number, y: number, tolerance: number): IsInEdgeResult {
  const { left, right, top, bottom } = element.getBoundingClientRect()
  const abs = Math.abs

  const { aroundX, aroundY } = isInAround(element, x, y, tolerance)

  const result = {
    [BaseEdge.LEFT]: (abs(x - left) < tolerance) && aroundY,
    [BaseEdge.RIGHT]: (abs(x - right) < tolerance) && aroundY,
    [BaseEdge.TOP]: (abs(y - top) < tolerance) && aroundX,
    [BaseEdge.BOTTOM]: (abs(y - bottom) < tolerance) && aroundX,
  }
  return {
    ...result,
    [ExtendedEdge.TOP_LEFT]: result[BaseEdge.LEFT] && result[BaseEdge.TOP],
    [ExtendedEdge.TOP_RIGHT]: result[BaseEdge.RIGHT] && result[BaseEdge.TOP],
    [ExtendedEdge.BOTTOM_LEFT]: result[BaseEdge.LEFT] && result[BaseEdge.BOTTOM],
    [ExtendedEdge.BOTTOM_RIGHT]: result[BaseEdge.RIGHT] && result[BaseEdge.BOTTOM],
  }
}
