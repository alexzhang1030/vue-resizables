import type { NativeElements, PropType } from 'vue'
import { defineComponent, h, onMounted, ref } from 'vue'
import type { ResizableConfig } from '..'
import { useResizable } from '@/_internal'

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
    let init = false
    onMounted(() => {
      if (!wrapperRef.value || init)
        return
      useResizable(wrapperRef.value, props.config)
      init = true
    })
    return () => h(props.as, { class: 'relative', ref: wrapperRef }, slots.default?.())
  },
})
