import { ref } from 'vue'
import type { ResizableConfig } from './config'
import type { Edge, IsInEdgeResult } from '@/utils'
import { BaseEdge, ExtendedEdge } from '@/utils'

const cursors: [Edge, string][] = [
  [ExtendedEdge.TOP_LEFT, 'nwse-resize'],
  [ExtendedEdge.TOP_RIGHT, 'nesw-resize'],
  [ExtendedEdge.BOTTOM_LEFT, 'nesw-resize'],
  [ExtendedEdge.BOTTOM_RIGHT, 'nwse-resize'],
  [BaseEdge.LEFT, 'ew-resize'],
  [BaseEdge.RIGHT, 'ew-resize'],
  [BaseEdge.TOP, 'ns-resize'],
  [BaseEdge.BOTTOM, 'ns-resize'],
]

function checkAbleCursor(
  edges: [Edge, string] | undefined,
  config: ResizableConfig['edge'],
): [Edge | null, string | null] {
  if (!edges)
    return [null, null]
  const [type, cursor] = edges
  if (config[type])
    return [type, cursor]
  return [null, null]
}

const updateWindowCursor = (cursor: string) => window.document.body.style.cursor = cursor

export function useCursors(config: ResizableConfig['edge']) {
  let oldCursor = ''
  const currentCursor = ref(oldCursor)

  function updateCursor(onlyUpdate: boolean): void
  function updateCursor(result: IsInEdgeResult): [Edge | null, string | null]
  function updateCursor(result: boolean | IsInEdgeResult) {
    if (typeof result === 'boolean') {
      updateWindowCursor(currentCursor.value)
      return
    }
    if (!oldCursor)
      oldCursor = currentCursor.value = getComputedStyle(document.body).getPropertyValue('cursor')
    const [type, cursor] = checkAbleCursor(cursors.find(([edge]) => result[edge]), config)
    currentCursor.value = cursor ?? oldCursor
    updateWindowCursor(currentCursor.value)
    return [type, cursor] as const
  }

  return {
    updateCursor,
    resetCursor: () => updateWindowCursor(oldCursor),
  }
}
