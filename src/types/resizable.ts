import type { NativeElements } from 'vue'

export interface Position { x: number; y: number }

export type ResizableEl = HTMLElement

export type As = (keyof NativeElements) | (NonNullable<unknown> & string)
