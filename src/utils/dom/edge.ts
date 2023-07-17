export enum BaseEdge {
  LEFT = 'left',
  RIGHT = 'right',
  TOP = 'top',
  BOTTOM = 'bottom',
}

export enum ExtendedEdge {
  TOP_LEFT = `${BaseEdge.TOP}-${BaseEdge.LEFT}`,
  TOP_RIGHT = `${BaseEdge.TOP}-${BaseEdge.RIGHT}`,
  BOTTOM_LEFT = `${BaseEdge.BOTTOM}-${BaseEdge.LEFT}`,
  BOTTOM_RIGHT = `${BaseEdge.BOTTOM}-${BaseEdge.RIGHT}`,
}

export type Edge = BaseEdge | ExtendedEdge

const TOLERANCE = 5

export type IsInEdgeResult = Record<Edge, boolean>

export function isInEdge(element: HTMLElement, x: number, y: number): IsInEdgeResult {
  const { left, right, top, bottom } = element.getBoundingClientRect()
  const abs = Math.abs
  const aroundY = (y - bottom) < TOLERANCE && (y - top) > -TOLERANCE
  const aroundX = (x - right) < TOLERANCE && (x - left) > -TOLERANCE

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
