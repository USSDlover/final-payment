export interface CreditCardInterface {
  cardNumber: string;
  holder: string;
  expirationDate: Date;
  ccv?: string;
  amount: number;
}
