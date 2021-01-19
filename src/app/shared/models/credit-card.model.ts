import { CreditCardInterface } from '../interfaces';

export class CreditCardModel implements CreditCardInterface {
  constructor(
    public cardNumber: string,
    public holder: string,
    public expirationDate: Date,
    public amount: number,
    public ccv?: string
  ) {
  }
}