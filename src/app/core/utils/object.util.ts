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
