export function entries<
  T extends Record<PropertyKey, unknown> = Record<PropertyKey, unknown>,
  K extends keyof T = keyof T,
  V = T[K],
>(obj: T) {
  return Object.entries(obj) as [K, V][]
}
