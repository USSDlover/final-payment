export interface PurchaseInterface {
  cardNumber: string;
  holder: string;
  expirationDate: Date;
  ccv?: string;
  amount: number;
}
