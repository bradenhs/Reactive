export function formatCurrency(num: number = 0) {
  return (num < 0 ? '-$' : '$') + Math.abs(num).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
}
