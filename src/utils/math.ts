export function round(num: number, nthDecimal = 2) {
  const bias = Math.pow(10, nthDecimal);
  return Math.round(num * bias) / bias;
}
