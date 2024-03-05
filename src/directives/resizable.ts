import type { Directive } from 'vue'
import { useResizable } from '@/composables'
import type { ResizableConfig } from '@/types'

export const vResizable: Directive<HTMLElement, ResizableConfig> = {
  beforeMount(el, binding) {
    useResizable(el, binding.value)
  },
}
