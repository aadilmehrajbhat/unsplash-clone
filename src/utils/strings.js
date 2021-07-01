export function formatCountInThousands(count) {
  const oneThousand = 1000;

  if (count < oneThousand) return count.toString();

  return `${(count / oneThousand).toFixed(1).replace(/\.0$/, '')}k`;
}
