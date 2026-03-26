export function formatPriceIQD(amount) {
  const num = Number(amount) || 0
  const formatted = num.toLocaleString('en-US')
  return `${formatted} د.ع`
}

export function formatPriceUSD(amount) {
  return `$${Number(amount).toFixed(2)}`
}
