import type { VNode } from 'vue'
import { PanelCompName, PanelHandleCompName } from '@/components'

export function isPanelHandle(vnode: VNode) {
  return (vnode?.type as any)?.name === PanelHandleCompName
}

export function isPanel(vnode: VNode) {
  return (vnode?.type as any)?.name === PanelCompName
}
