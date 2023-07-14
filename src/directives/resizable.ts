import { type Directive } from 'vue'
import { useResizable } from '@/_internal'
import type { Edge } from '@/utils'
import type { ResizableConfig } from '@/_internal/resizable/config'

export const Resizable: Directive<HTMLElement, {
  edge: Partial<Record<Edge, boolean>>
}> = {
  beforeMount(el, binding) {
    const config: ResizableConfig = {
      edge: {},
    }
    if (binding.arg && binding.arg === 'edge')
      config.edge = binding.modifiers
    useResizable(el, config)
  },
}
