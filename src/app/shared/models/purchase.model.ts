import { PurchaseInterface } from '../interfaces';

export class PurchaseModel implements PurchaseInterface {
  constructor(
    public cardNumber: string,
    public holder: string,
    public expirationDate: Date,
    public amount: number,
    public ccv?: string
  ) {
  }
}
