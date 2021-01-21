import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';

import {MatCardHarness} from '@angular/material/card/testing';

import {PurchaseCardComponent} from './purchase-card.component';
import {CardNumberPipe} from '../../pipes';
import {PurchaseModel} from '../../models';
import {PurchaseInterface} from '../../interfaces';
import {SharedModule} from '../../shared.module';

describe('CreditCardComponent', () => {
  let fixture: ComponentFixture<PurchaseCardComponent>;
  let dummyPurchase: PurchaseInterface;
  let component: PurchaseCardComponent;
  let loader: HarnessLoader;

  beforeEach(async () => {
    dummyPurchase = PurchaseModel.dummy();
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [PurchaseCardComponent, CardNumberPipe]
    }).compileComponents();
    fixture = TestBed.createComponent(PurchaseCardComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    component.purchase = dummyPurchase;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should have material card component', async () => {
    const cards = await loader.getAllHarnesses(MatCardHarness);
    expect(cards.length).toBe(1);
  });

  it('should have correct title', async () => {
    const card = await loader.getHarness(MatCardHarness);
    expect(await card.getTitleText()).toContain(dummyPurchase.holder);
  });

  it('should have correct subtitle', async () => {
    const card = await loader.getHarness(MatCardHarness);
    const cardNumber = await card.getSubtitleText();
    expect(cardNumber.replace(/\s/g, '')).toContain(dummyPurchase.cardNumber);
  });
});
