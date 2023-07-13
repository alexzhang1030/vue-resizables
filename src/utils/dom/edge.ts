export enum Edge {
  LEFT,
  RIGHT,
  TOP,
  BOTTOM,
  TOP_LEFT,
  TOP_RIGHT,
  BOTTOM_LEFT,
  BOTTOM_RIGHT,
}

const THRESHOLD = 5

export function isInEdge(element: HTMLElement, x: number, y: number) {
  const { left, right, top, bottom } = element.getBoundingClientRect()
  const result = {
    [Edge.LEFT]: Math.abs(x - left) < THRESHOLD,
    [Edge.RIGHT]: Math.abs(x - right) < THRESHOLD,
    [Edge.TOP]: Math.abs(y - top) < THRESHOLD,
    [Edge.BOTTOM]: Math.abs(y - bottom) < THRESHOLD,
  }
  return {
    ...result,
    [Edge.TOP_LEFT]: result[Edge.TOP] && result[Edge.LEFT],
    [Edge.TOP_RIGHT]: result[Edge.TOP] && result[Edge.RIGHT],
    [Edge.BOTTOM_LEFT]: result[Edge.BOTTOM] && result[Edge.LEFT],
    [Edge.BOTTOM_RIGHT]: result[Edge.BOTTOM] && result[Edge.RIGHT],
  }
}
