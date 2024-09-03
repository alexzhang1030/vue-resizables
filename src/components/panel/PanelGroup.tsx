import type { PropType, Ref } from 'vue'
import { defineComponent, h, onMounted, provide, ref } from 'vue'
import { defaultConfig } from '../../utils/config/index'
import { type As, BaseEdge, type ResizableConfigResolved } from '@/types'
import { isPanel, isPanelHandle, updateSize } from '@/utils'
import { registerPointerEvents } from '@/composables'

export const PanelGroupCompName = 'VUE_RESIZABLE_PANEL_GROUP'

export const PanelGroupSharedPropsKey = 'VUE_RESIZABLE_PANEL_GROUP_SHARED_PROPS'

export interface PanelGroupSharedProps {
  isHorizontal: Ref<boolean>
}

const config: ResizableConfigResolved = {
  ...defaultConfig,
  edge: {
    left: true,
    right: true,
  },
}

export const PanelGroup = defineComponent({
  name: PanelGroupCompName,
  props: {
    as: {
      type: String as PropType<As>,
      default: 'div',
    },
    direction: {
      type: String as PropType<'horizontal' | 'vertical'>,
      default: 'horizontal',
    },
  },
  setup(props, { slots }) {
    const isHorizontal = ref(props.direction === 'horizontal')
    provide(PanelGroupSharedPropsKey, { isHorizontal })

    const defaultSlots = slots?.default?.() || []
    const defaultSlotsLen = defaultSlots?.length
    const paused = ref(false)

    onMounted(() => {
      if (defaultSlotsLen > 2) {
        let i = 1
        while (i < defaultSlotsLen) {
          const prev = defaultSlots[i - 1]
          const curr = defaultSlots[i]
          const next = defaultSlots[i + 1]

          if (isPanelHandle(curr) && isPanel(prev) && isPanel(next)) {
            const { deltaPosition } = registerPointerEvents(
              curr.el as HTMLElement,
              config,
              paused,
              {
                handlePointerMove: () => {
                  updateSize({
                    el: prev.el as HTMLElement,
                    deltaPosition: deltaPosition.value,
                    type: isHorizontal.value ? BaseEdge.RIGHT : BaseEdge.BOTTOM,
                    config,
                  })
                  updateSize({
                    el: next.el as HTMLElement,
                    deltaPosition: { x: deltaPosition.value.x * -1, y: deltaPosition.value.y * -1 },
                    type: isHorizontal.value ? BaseEdge.LEFT : BaseEdge.TOP,
                    config,
                  })
                },
              },
              true,
            )
            i += 2
          }
          else {
            i += 1
          }
        }
      }
    })

    return () => h(props.as, {
      class: [
        'flex',
        isHorizontal.value ? 'flex-row' : 'flex-col',
      ],
    }, defaultSlots)
  },
})
