import { type Directive } from 'vue'
import { type ResizableConfig, useResizable } from '@/composables'

export const Resizable: Directive<HTMLElement, ResizableConfig> = {
  beforeMount(el, binding) {
    useResizable(el, binding.value)
  },
}
