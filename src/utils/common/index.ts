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
