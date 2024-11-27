import type { As } from '@/types'
import type { PropType } from 'vue'
import { defineComponent, h } from 'vue'

export const PanelCompName = 'VUE_RESIZABLE_PANEL'

export const Panel = defineComponent({
  name: PanelCompName,
  props: {
    as: {
      type: String as PropType<As>,
      default: 'div',
    },
  },
  setup(props, { slots }) {
    const defaultSlots = slots?.default?.()

    return () => h(props.as, {}, defaultSlots)
  },
})
