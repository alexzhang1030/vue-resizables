import type { ResizableEl } from '@/_internal'

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
