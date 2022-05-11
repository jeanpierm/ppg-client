export function deleteObjectItemsByValue(object: Record<string, number>, value: number) {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    if (result[key] === value) delete result[key];
  });
  return result;
}
