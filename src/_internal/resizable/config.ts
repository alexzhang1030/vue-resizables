import { BaseEdge, type Edge, ExtendedEdge, notDefined } from '@/utils'

export interface ResizableConfig {
  edge: Partial<Record<Edge, boolean>>
}

export const defaultConfig: ResizableConfig = {
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
}

function autoEnableCombinedEdges(edge: Partial<ResizableConfig['edge']>): ResizableConfig['edge'] {
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

export function parseConfig(config: Partial<ResizableConfig>): ResizableConfig {
  return {
    edge: autoEnableCombinedEdges(config.edge ?? {}),
  }
}
