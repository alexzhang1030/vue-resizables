import type { DeepPartial } from 'unocss'
import { BaseEdge, type Edge, ExtendedEdge, deepMerge, notDefined } from '@/utils'

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

export const defaultConfig: ResizableConfigResolved = {
  edge: {
    [BaseEdge.LEFT]: false,
    [BaseEdge.TOP]: false,
    [BaseEdge.RIGHT]: false,
    [BaseEdge.BOTTOM]: false,
    [ExtendedEdge.TOP_LEFT]: false,
    [ExtendedEdge.TOP_RIGHT]: false,
    [ExtendedEdge.BOTTOM_LEFT]: false,
    [ExtendedEdge.BOTTOM_RIGHT]: false,
  },
  border: false,
  throttleTime: 15,
  size: {
    min: {
      width: 0,
      height: 0,
    },
    max: {
      width: Number.POSITIVE_INFINITY,
      height: Number.POSITIVE_INFINITY,
    },
  },
}

function autoEnableExtendedEdges(edge: Partial<ResizableConfig['edge']>): ResizableConfig['edge'] {
  if (edge[BaseEdge.LEFT] && edge[BaseEdge.TOP] && notDefined(edge[ExtendedEdge.TOP_LEFT]))
    edge[ExtendedEdge.TOP_LEFT] = true
  if (edge[BaseEdge.RIGHT] && edge[BaseEdge.TOP] && notDefined(edge[ExtendedEdge.TOP_RIGHT]))
    edge[ExtendedEdge.TOP_RIGHT] = true
  if (edge[BaseEdge.LEFT] && edge[BaseEdge.BOTTOM] && notDefined(edge[ExtendedEdge.BOTTOM_LEFT]))
    edge[ExtendedEdge.BOTTOM_LEFT] = true
  if (edge[BaseEdge.RIGHT] && edge[BaseEdge.BOTTOM] && notDefined(edge[ExtendedEdge.BOTTOM_RIGHT]))
    edge[ExtendedEdge.BOTTOM_RIGHT] = true
  return {
    ...defaultConfig.edge,
    ...edge,
  }
}

export function parseConfig(config: ResizableConfig): ResizableConfigResolved {
  const resolvedConfig = deepMerge(defaultConfig, config)
  return {
    ...resolvedConfig,
    border: config.border,
    edge: autoEnableExtendedEdges(config.edge ?? {}),
  } as ResizableConfigResolved
}
