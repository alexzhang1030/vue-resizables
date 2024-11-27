import type { ResizableConfig } from '@/types'
import type { Directive } from 'vue'
import { useResizable } from '@/composables'

export const vResizable: Directive<HTMLElement, ResizableConfig> = {
  beforeMount(el, binding) {
    useResizable(el, binding.value)
  },
}
