/**
 * Agrega un (1) día a una fecha
 */
export function incrementDate(
  date: Date | number | string,
  increment: number
): Date | undefined {
  if (!date) return;
  console.log(date);
  const incrementedDate = new Date(date);
  incrementedDate.setDate(incrementedDate.getDate() + increment);

  return incrementedDate;
}
