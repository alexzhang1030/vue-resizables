import type { Directive } from 'vue'
import type { ResizableConfig } from '@/types'
import { useResizable } from '@/composables'

export const vResizable: Directive<HTMLElement, ResizableConfig> = {
  beforeMount(el, binding) {
    useResizable(el, binding.value)
  },
}
