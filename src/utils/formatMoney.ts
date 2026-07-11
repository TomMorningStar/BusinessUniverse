const moneyFormatter = new Intl.NumberFormat('ru-RU', {
  maximumFractionDigits: 0,
});

export function formatMoney(amount: number): string {
  return `${moneyFormatter.format(amount)} ₽`;
}
