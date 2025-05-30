export interface TMoney {
  amount: string;
  currency: number; // 125 for rubles
  currencySymbol: string;
}

export function FormatMoneyAmountWithSpaces(value: string): string {
  const tmp: string = value.split('.')[0];
  return (
    tmp
      .split('')
      .reverse()
      .map((el, ind) => {
        return el + (ind % 3 == 0 ? ' ' : '');
      })
      .reverse()
      .join('')
      .slice(0, -1) +
    (value.split('.').length > 1 ? ',' + value.split('.')[1] : ',00')
  );
}

export function FormatMoney(value: TMoney): string {
  return FormatMoneyAmountWithSpaces(value.amount) + ' ' + value.currencySymbol;
}
