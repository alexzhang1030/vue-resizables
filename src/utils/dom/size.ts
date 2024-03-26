import type { Position } from '@vueuse/core'
import type { Edge, ResizableConfigResolved, ResizableEl, ResizableSizeConfig } from '@/types'
import { BaseEdge, ExtendedEdge } from '@/types'

type SizeMappingFn = (p1: { width: number, height: number }, p2: { x: number, y: number }) => { width: number, height: number }

const sizeMapping: Record<Edge, SizeMappingFn> = {
  [BaseEdge.LEFT]: ({ width, height }, { x }) => ({ width: width + -x, height }),
  [BaseEdge.TOP]: ({ width, height }, { y }) => ({ width, height: height + -y }),
  [BaseEdge.RIGHT]: ({ width, height }, { x }) => ({ width: width + x, height }),
  [BaseEdge.BOTTOM]: ({ width, height }, { y }) => ({ width, height: height + y }),
  [ExtendedEdge.TOP_LEFT]: ({ width, height }, { x, y }) => ({ width: width + -x, height: height + -y }),
  [ExtendedEdge.TOP_RIGHT]: ({ width, height }, { x, y }) => ({ width: width + x, height: height + -y }),
  [ExtendedEdge.BOTTOM_LEFT]: ({ width, height }, { x, y }) => ({ width: width + -x, height: height + y }),
  [ExtendedEdge.BOTTOM_RIGHT]: ({ width, height }, { x, y }) => ({ width: width + x, height: height + y }),
}

export function calcSize(deltaPosition: Position, el: HTMLElement, type: Edge) {
  const { x, y } = deltaPosition
  const { width: elWidth, height: elHeight } = el.getBoundingClientRect()

  const result = { width: elWidth, height: elHeight }

  return sizeMapping[type](result, { x, y })
}

export function updateSize({
  el,
  deltaPosition,
  type,
  config,
}: {
  el: HTMLElement
  deltaPosition: Position
  type: Edge
  config: ResizableConfigResolved
},

) {
  const { width, height } = calcSize(deltaPosition, el, type)
  const { w, h } = resolveLimit({ width, height, config: config.size, el })

  // check enabled edge direction, and update enabled w/h
  const scaledW = w / config.scale
  const scaledH = h / config.scale
  if (config.enabledEdgeDirection.vertical)
    el.style.height = `${scaledH}px`
  if (config.enabledEdgeDirection.horizontal)
    el.style.width = `${scaledW}px`

  return { w: scaledW, h: scaledH }
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
