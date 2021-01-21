import {PurchaseInterface} from '../interfaces';

export class PurchaseModel implements PurchaseInterface {
  constructor(
    public cardNumber: string,
    public holder: string,
    public expirationDate: Date,
    public amount: number,
    public ccv?: string
  ) {
  }

  static dummy(): PurchaseModel {
    return new PurchaseModel(
      '1234567898765432',
      'Jon Done',
      new Date(new Date().getDate() + 10000000),
      20000,
      '354'
    );
  }
}
