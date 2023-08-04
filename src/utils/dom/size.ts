import type { Position } from '@vueuse/core'
import type { Edge, ResizableConfigResolved, ResizableEl, ResizableSizeConfig } from '@/types'
import { BaseEdge, ExtendedEdge } from '@/types'

export function calcSize(deltaPosition: Position, el: HTMLElement, type: Edge) {
  let { x, y } = deltaPosition
  const { width: elWidth, height: elHeight } = el.getBoundingClientRect()

  const result = { width: elWidth, height: elHeight }

  x = Math.abs(x)
  y = Math.abs(y)

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

export function calculatePixelValue(value: string | number, el: ResizableEl) {
  if (typeof value === 'number')
    return value
  const [_, number, unit] = value.match(/(\d+)(.+)/) ?? [null, null, null]
  if (!unit || !number)
    throw new Error(`${value} is not a valid value`)
  switch (unit) {
    case 'vh':
      return (window.innerHeight / 100) * Number.parseInt(number)
    case 'vw':
      return (window.innerWidth / 100) * Number.parseInt(number)
    case '%':
      if (!el || !(el instanceof HTMLElement))
        throw new Error('Need a invalid element to calculate % value')
      return (el.parentElement!.getBoundingClientRect().width / 100) * Number.parseInt(number)
    default:
      throw new Error(`Unknown unit ${unit}`)
  }
}
