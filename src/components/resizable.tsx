import type { NativeElements, PropType } from 'vue'
import { defineComponent, h, ref, toRef } from 'vue'
import { useResizable } from '@/composables'
import type { ResizableConfig } from '@/types'

export const Resizable = defineComponent({
  name: 'VueResizableComp',
  props: {
    config: {
      type: Object as PropType<ResizableConfig>,
      default: () => ({}),
    },
    as: {
      type: String as PropType<(keyof NativeElements) | (NonNullable<unknown> & string)>,
      default: 'div',
    },
  },
  setup(props, { slots }) {
    const wrapperRef = ref<HTMLElement | null>(null)

    const result = useResizable(wrapperRef, toRef(props, 'config'))

    return () => h(props.as, { class: 'relative', ref: wrapperRef }, slots.default?.({ result }))
  },
})
