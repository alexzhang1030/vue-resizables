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

const THRESHOLD = 5

export type IsInEdgeResult = Record<Edge, boolean>

export function isInEdge(element: HTMLElement, x: number, y: number): IsInEdgeResult {
  const { left, right, top, bottom } = element.getBoundingClientRect()
  const result = {
    [BaseEdge.LEFT]: Math.abs(x - left) < THRESHOLD,
    [BaseEdge.RIGHT]: Math.abs(x - right) < THRESHOLD,
    [BaseEdge.TOP]: Math.abs(y - top) < THRESHOLD,
    [BaseEdge.BOTTOM]: Math.abs(y - bottom) < THRESHOLD,
  }
  return {
    ...result,
    [ExtendedEdge.TOP_LEFT]: result[BaseEdge.TOP] && result[BaseEdge.LEFT],
    [ExtendedEdge.TOP_RIGHT]: result[BaseEdge.TOP] && result[BaseEdge.RIGHT],
    [ExtendedEdge.BOTTOM_LEFT]: result[BaseEdge.BOTTOM] && result[BaseEdge.LEFT],
    [ExtendedEdge.BOTTOM_RIGHT]: result[BaseEdge.BOTTOM] && result[BaseEdge.RIGHT],
  }
}
