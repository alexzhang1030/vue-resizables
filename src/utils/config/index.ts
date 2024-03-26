import { deepMerge, notDefined } from '../common'
import type { ResizableConfig, ResizableConfigResolved } from '@/types'
import { BaseEdge, ExtendedEdge } from '@/types'

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
  tolerance: 5,
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
  scale: 1,
  onSizeChange(_size) {},
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

export function parseConfig(config: Partial<ResizableConfig> | undefined = {}): ResizableConfigResolved {
  const resolvedConfig = deepMerge(defaultConfig, config)
  return {
    ...resolvedConfig,
    border: config.border ?? defaultConfig.border,
    edge: autoEnableExtendedEdges(config.edge ?? {}),
  } as ResizableConfigResolved
}
