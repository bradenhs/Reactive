export function formatCurrency(num: number = 0) {
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
}
