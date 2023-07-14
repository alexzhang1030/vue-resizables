import { type Directive } from 'vue'
import { useResizable } from '@/_internal'
import type { ResizableConfig } from '@/_internal/resizable/config'

export const Resizable: Directive<HTMLElement, ResizableConfig> = {
  beforeMount(el, binding) {
    useResizable(el, binding.value)
  },
}
