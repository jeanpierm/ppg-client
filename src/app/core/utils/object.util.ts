export function deletePropertiesByValue(
  object: Record<string, number>,
  value: number
) {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    if (result[key] === value) delete result[key];
  });
  return result;
}

export function isEmpty(s: string): boolean {
  if (!s) return true;
  return s.trim().length === 0;
}

export function getRandomFromArray(array: unknown[]): unknown {
  const randomIndice = Math.floor(Math.random() * array.length);
  return array[randomIndice];
}
// export function titleCase
