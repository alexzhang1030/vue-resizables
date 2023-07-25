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

export type IsInEdgeResult = Record<Edge, boolean>
