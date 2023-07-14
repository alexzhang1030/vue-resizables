import type { PropType, Ref } from 'vue'
import { computed, defineComponent, render } from 'vue'
import type { ResizableConfig } from './config'
import type { ResizableEl } from '.'
import { BaseEdge, ExtendedEdge, getIntersection, oneOf } from '@/utils'
import type { Edge } from '@/utils'

// direction styles
const ds = {
  x: 'w-[calc(100%+5px)] h-8px',
  y: 'h-[calc(100%+5px)] w-8px',
}

// translates
const t = {
  //
  xn: 'translate-x--2.5px',
  yn: 'translate-y--2.5px',
  //
  xpf: 'translate-x-50%',
  xnf: 'translate-x--50%',
  //
  ypf: 'translate-y-50%',
  ynf: 'translate-y--50%',
}

const styles = {
  [BaseEdge.TOP]: `top-0 left-0 ${ds.x} ${t.ynf} ${t.xn}`,
  [BaseEdge.LEFT]: `top-0 left-0 ${ds.y} ${t.yn} ${t.xnf}`,
  [BaseEdge.BOTTOM]: `bottom-0 left-0 ${ds.x} ${t.ypf} ${t.xn}`,
  [BaseEdge.RIGHT]: `top-0 right-0 ${ds.y} ${t.yn} ${t.xpf}`,
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

function BorderItem({ edge }: { edge: BaseEdge }) {
  return <div class={[
    'absolute rounded-5px bg-gray-300/50% animate-fade-in animate-duration-100',
    styles[edge],
  ]}></div>
}

const Border = defineComponent({
  name: 'ResizableSign',
  props: {
    config: {
      type: Object as PropType<ResizableConfig['edge']>,
      required: true,
    },
    moveType: {
      type: Object as PropType<Ref<Edge | null>>,
      required: true,
    },
  },
  setup(props) {
    const allValidEdges = computed<BaseEdge[]>(() =>
      [BaseEdge.TOP, BaseEdge.LEFT, BaseEdge.BOTTOM, BaseEdge.RIGHT].filter(edge => props.config[edge]),
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
          <BorderItem edge={edge} key={edge} />
        ))
      }
    </>
    )
  },
})

export function renderBorder(el: ResizableEl, config: ResizableConfig['edge'], moveType: Ref<Edge | null>) {
  const position = getComputedStyle(el).position
  if (oneOf(position, ['static', '']))
    el.style.position = 'relative'
  render(<Border {...{ config, moveType }} />, el)
}
