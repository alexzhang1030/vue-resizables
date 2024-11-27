import type { Edge, ResizableBorderConfig, ResizableConfig, ResizableConfigResolved, ResizableEl } from '@/types'
import type { PropType, Ref } from 'vue'
import { BaseEdge, ExtendedEdge } from '@/types'
import { getIntersection, oneOf } from '@/utils'
import { computed, defineComponent, render } from 'vue'
import { getStyles, transpileStyles } from './style'

export const defaultBorderConfig: ResizableBorderConfig = {
  render: true,
  style: {
    headless: false,
    size: 5,
  },
}

const EdgeTargetEdges = {
  [BaseEdge.TOP]: [BaseEdge.TOP],
  [BaseEdge.LEFT]: [BaseEdge.LEFT],
  [BaseEdge.BOTTOM]: [BaseEdge.BOTTOM],
  [BaseEdge.RIGHT]: [BaseEdge.RIGHT],
  [ExtendedEdge.TOP_LEFT]: [BaseEdge.TOP, BaseEdge.LEFT],
  [ExtendedEdge.TOP_RIGHT]: [BaseEdge.TOP, BaseEdge.RIGHT],
  [ExtendedEdge.BOTTOM_LEFT]: [BaseEdge.BOTTOM, BaseEdge.LEFT],
  [ExtendedEdge.BOTTOM_RIGHT]: [BaseEdge.BOTTOM, BaseEdge.RIGHT],
}

function BorderItem({ edge, config }: { edge: BaseEdge, config: ResizableConfig['border'] }) {
  const { theme, append } = getStyles(config)
  const { className, style } = transpileStyles((config as ResizableBorderConfig).style, edge)
  return (
    <div
      class={[
        'absolute animate-fade-in animate-duration-100',
        append ?? [],
        theme[edge],
        className,
      ]}
      style={style}
    >
    </div>
  )
}

const Border = defineComponent({
  name: 'ResizableSign',
  props: {
    config: {
      type: Object as PropType<ResizableConfigResolved>,
      required: true,
    },
    moveType: {
      type: Object as PropType<Ref<Edge | null>>,
      required: true,
    },
  },
  setup(props) {
    const allValidEdges = computed<BaseEdge[]>(() =>
      [BaseEdge.TOP, BaseEdge.LEFT, BaseEdge.BOTTOM, BaseEdge.RIGHT].filter(edge => props.config.edge[edge]),
    )

    const renderList = computed<BaseEdge[]>(() => {
      const moveType = props.moveType.value
      if (!moveType)
        return []
      return getIntersection(allValidEdges.value, EdgeTargetEdges[moveType])
    })

    return () => (
      <>
        {
          renderList.value.map(edge => (
            <BorderItem edge={edge} key={edge} config={props.config.border} />
          ))
        }
      </>
    )
  },
})

export function renderBorder(el: ResizableEl, config: ResizableConfigResolved, moveType: Ref<Edge | null>) {
  const position = getComputedStyle(el).position
  if (oneOf(position, ['static', '']) && (typeof config.border === 'object' ? (config.border.forceChangePositionValue) : true))
    el.style.position = 'relative'
  render(<Border {...{ config, moveType }} />, el)
}
