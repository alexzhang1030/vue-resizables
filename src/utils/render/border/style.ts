import type { CSSProperties } from 'vue'
import type { ResizableBorderConfig, ResizableConfig } from '@/types'
import { BaseEdge } from '@/types'
import { oneOf } from '@/utils/common'

// @unocss-include

// direction styles
const ds = {
  // default Theme
  dx: 'w-[calc(100%+5px)] h-8px',
  dy: 'h-[calc(100%+5px)] w-8px',
  // sticky Theme
  sx: 'w-full',
  sy: 'h-full',
}

// translates
const t = {
  /// default theme
  //
  dxn: 'translate-x--2.5px',
  dyn: 'translate-y--2.5px',
  //
  dxpf: 'translate-x-50%',
  dxnf: 'translate-x--50%',
  // default_y_positive_full / default_y_negative_full
  dypf: 'translate-y-50%',
  dynf: 'translate-y--50%',
  /// sticky theme
  sxn: 'translate-x-50%',
  syn: 'translate-y-50%',
  sxp: 'translate-x--50%',
  syp: 'translate-y--50%',
}

const defaultTheme = {
  [BaseEdge.TOP]: `top-0 left-0 ${ds.dx} ${t.dynf} ${t.dxn}`,
  [BaseEdge.LEFT]: `top-0 left-0 ${ds.dy} ${t.dyn} ${t.dxnf}`,
  [BaseEdge.BOTTOM]: `bottom-0 left-0 ${ds.dx} ${t.dypf} ${t.dxn}`,
  [BaseEdge.RIGHT]: `top-0 right-0 ${ds.dy} ${t.dyn} ${t.dxpf}`,
}

const stickyTheme = {
  [BaseEdge.TOP]: `top-0 left-0 ${ds.sx}`,
  [BaseEdge.LEFT]: `top-0 left-0 ${ds.sy}`,
  [BaseEdge.BOTTOM]: `bottom-0 left-0 ${ds.sx}`,
  [BaseEdge.RIGHT]: `top-0 right-0 ${ds.sy}`,
}

function getDirection(direction: BaseEdge) {
  return oneOf(direction, [BaseEdge.TOP, BaseEdge.BOTTOM]) ? 'x' : 'y'
}

export function getStyles(config: ResizableConfig['border']) {
  if (!config || typeof config === 'boolean' || !(config.style?.headless))
    return { theme: defaultTheme, append: 'rounded-5px bg-gray-300/50% ' }
  return { theme: stickyTheme }
}

export function transpileStyles(config: ResizableBorderConfig['style'], direction: BaseEdge) {
  let className = ''
  const style: CSSProperties = {}
  if (config?.class)
    className = config.class
  if (config?.color)
    style.backgroundColor = config.color
  if (config?.size) {
    const d = getDirection(direction)
    Reflect.set(style, d === 'x' ? 'height' : 'width', `${config.size}px`)
  }
  return {
    className,
    style,
  }
}
