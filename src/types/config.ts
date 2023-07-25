import type { DeepPartial } from 'unocss'
import type { Edge } from './edge'

export interface ResizableBorderConfig {
  render: boolean
  style?: {
    headless?: boolean
    color?: string
    class?: string
    size?: number
  }
}

export interface ResizableSizeConfig {
  min: {
    width: number | string
    height: number | string
  }
  max: {
    width: number | string
    height: number | string
  }
}

export interface ResizableConfig {
  /**
   * @default Record<Edge, boolean>
   */
  edge: Partial<Record<Edge, boolean>>
  /**
   * @default false
   */
  border?: boolean | ResizableBorderConfig
  /**
   * @default 15
   */
  throttleTime?: number
  size?: DeepPartial<ResizableSizeConfig>
}

export type ResizableConfigResolved = Omit<Required<ResizableConfig>, 'size'> & {
  size: ResizableSizeConfig
}
