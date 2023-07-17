import { type Directive } from 'vue'
import type { ResizableConfig } from '..'
import { useResizable } from '@/_internal'

export const Resizable: Directive<HTMLElement, ResizableConfig> = {
  beforeMount(el, binding) {
    useResizable(el, binding.value)
  },
}
