import type { PropType, Ref } from 'vue'
import { computed, defineComponent, render } from 'vue'
import type { ResizableBorderConfig, ResizableConfig } from '../config'
import type { ResizableEl } from '..'
import { getStyles, transpileStyles } from './style'
import { BaseEdge, ExtendedEdge, getIntersection, oneOf } from '@/utils'
import type { Edge } from '@/utils'

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

function BorderItem({ edge, config }: { edge: BaseEdge; config: ResizableConfig['border'] }) {
  const baseStyle = getStyles(config)
  const { className, style } = transpileStyles((config as ResizableBorderConfig).style, edge)
  return <div class={[
    'absolute bg-gray-300/50% animate-fade-in animate-duration-100',
    baseStyle[edge], className,
  ]} style={style}></div>
}

const Border = defineComponent({
  name: 'ResizableSign',
  props: {
    config: {
      type: Object as PropType<ResizableConfig>,
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

    return () => (<>
      {
        renderList.value.map(edge => (
          <BorderItem edge={edge} key={edge} config={props.config.border} />
        ))
      }
    </>
    )
  },
})

export function renderBorder(el: ResizableEl, config: ResizableConfig, moveType: Ref<Edge | null>) {
  const position = getComputedStyle(el).position
  if (oneOf(position, ['static', '']))
    el.style.position = 'relative'
  render(<Border {...{ config, moveType }} />, el)
}
