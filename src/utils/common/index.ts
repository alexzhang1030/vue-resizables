export function entries<
  T extends Record<PropertyKey, unknown> = Record<PropertyKey, unknown>,
  K extends keyof T = keyof T,
  V = T[K],
>(obj: T) {
  return Object.entries(obj) as [K, V][]
}

export function oneOf<T>(value: T, values: T[]): boolean {
  return values.includes(value)
}

export const notDefined = <T>(value: T | undefined): value is undefined => value === undefined

export const getIntersection = <T>(a: T[], b: T[]): T[] => a.filter(v => b.includes(v))

interface AnyObject { [k: string]: any }

export function isObject(item: any): item is AnyObject {
  return (item && typeof item === 'object' && !Array.isArray(item))
}

export function deepMerge(target: AnyObject, ...sources: AnyObject[]): AnyObject {
  if (!sources.length)
    return target
  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key])
          Object.assign(target, { [key]: {} })
        deepMerge(target[key], source[key])
      }
      else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }

  return deepMerge(target, ...sources)
}
