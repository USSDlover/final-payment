import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PurchaseCardComponent} from './purchase-card.component';
import {CardNumberPipe} from '../../pipes';
import {PurchaseModel} from '../../models';
import {PurchaseInterface} from '../../interfaces';

describe('CreditCardComponent', () => {
  let component: PurchaseCardComponent;
  let fixture: ComponentFixture<PurchaseCardComponent>;
  let dummyPurchaseModel: PurchaseInterface;

  beforeEach(async () => {
    dummyPurchaseModel = PurchaseModel.dummy();
    await TestBed.configureTestingModule({
      declarations: [PurchaseCardComponent, CardNumberPipe]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseCardComponent);
    component = fixture.componentInstance;
    component.purchase = dummyPurchaseModel;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
