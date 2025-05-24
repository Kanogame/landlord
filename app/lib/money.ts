export interface TMoney {
  amount: string;
  currency: number; // 125 for rubles
  currencySymbol: string;
}

export function FormatMoneyAmountWithSpaces(value: string): string {
  return value
    .split('')
    .reverse()
    .map((el, ind) => {
      return el + (ind % 3 == 0 ? ' ' : '');
    })
    .reverse()
    .join('')
    .slice(0, -1);
}

export function FormatMoney(value: TMoney): string {
  return FormatMoneyAmountWithSpaces(value.amount) + ' ' + value.currencySymbol;
}
