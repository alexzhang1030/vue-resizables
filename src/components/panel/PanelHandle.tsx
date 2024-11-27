import type { As } from '@/types'
import type { PropType } from 'vue'
import type { PanelGroupSharedProps } from './PanelGroup'
import { defineComponent, h, inject } from 'vue'
import { PanelGroupSharedPropsKey } from './PanelGroup'

export const PanelHandleCompName = 'VUE_RESIZABLE_PANEL_HANDLE'

export const PanelHandle = defineComponent({
  name: PanelHandleCompName,
  props: {
    as: {
      type: String as PropType<As>,
      default: 'div',
    },
  },
  setup(props, { slots }) {
    const defaultSlots = slots?.default?.()

    const { isHorizontal } = inject(PanelGroupSharedPropsKey) as PanelGroupSharedProps

    return () => defaultSlots
      ? h(props.as, {}, defaultSlots)
      : h(props.as, {
        class: [
          'rounded-lg flex justify-center items-center bg-gray-300 active:bg-gray-400',
          isHorizontal.value ? 'cursor-ew-resize' : ' cursor-ns-resize',
        ],
      }, h('div', {
        class: [
          isHorizontal.value ? 'i-carbon-drag-horizontal' : 'i-carbon-drag-vertical',
        ],
      }))
  },
})
