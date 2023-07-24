import type { ResizableConfigResolved, ResizableSizeConfig } from './config'
import type { Position, ResizableEl } from '.'
import type { Edge } from '@/utils'
import { BaseEdge, ExtendedEdge, calculatePixelValue } from '@/utils'

export function calcSize(deltaPosition: Position, el: HTMLElement, type: Edge) {
  const { x, y } = deltaPosition
  const { width: elWidth, height: elHeight } = el.getBoundingClientRect()

  const result = { width: elWidth, height: elHeight }

  switch (type) {
    case BaseEdge.LEFT:
    case BaseEdge.RIGHT:
      result.width += x
      break
    case BaseEdge.TOP:
    case BaseEdge.BOTTOM:
      result.height += y
      break
    case ExtendedEdge.TOP_LEFT:
    case ExtendedEdge.TOP_RIGHT:
    case ExtendedEdge.BOTTOM_LEFT:
    case ExtendedEdge.BOTTOM_RIGHT:
      result.width += x
      result.height += y
      break
    default:
      break
  }

  return result
}

export function updateSize({
  el, deltaPosition, type, config,
}: {
  el: HTMLElement
  deltaPosition: Position
  type: Edge
  config: ResizableConfigResolved
},

) {
  const { width, height } = calcSize(deltaPosition, el, type)
  const { w, h } = resolveLimit({ width, height, config: config.size, el })

  el.style.width = `${w}px`
  el.style.height = `${h}px`
}

export function resolveLimit({ width, height, config, el }: {
  width: number
  height: number
  config: ResizableSizeConfig
  el: ResizableEl
}) {
  const { min, max } = config
  const [minWidth, minHeight, maxWidth, maxHeight] = [min.width, min.height, max.width, max.height].map(item => calculatePixelValue(item, el))
  return {
    w: Math.max(minWidth, Math.min(maxWidth, width)),
    h: Math.max(minHeight, Math.min(maxHeight, height)),
  }
}
