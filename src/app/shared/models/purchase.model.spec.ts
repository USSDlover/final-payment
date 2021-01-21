import {PurchaseModel} from './purchase.model';

describe('PurchaseModel', () => {
  let purchase: PurchaseModel;

  it('should be truthy', () => {
    purchase = new PurchaseModel(
      '1234567812345678',
      'John Done',
      new Date(),
      20000,
      '123'
    );
    expect(purchase).toBeTruthy();
  });

  it('should generate dummy data', () => {
    purchase = PurchaseModel.dummy();
    expect(purchase).toBeTruthy();
  });

});
