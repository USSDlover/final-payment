import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {PurchaseComponent} from './purchase.component';
import {HarnessLoader} from '@angular/cdk/testing';
import {SharedModule} from '../shared/shared.module';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {ApiService} from '../core/services';
import {provideMockStore} from '@ngrx/store/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldHarness} from '@angular/material/form-field/testing';
import {MatButtonHarness} from '@angular/material/button/testing';
import {of} from 'rxjs';
import {PurchaseModel} from '../shared/models';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('PurchaseComponent', () => {
  let fixture: ComponentFixture<PurchaseComponent>;
  let component: PurchaseComponent;
  let loader: HarnessLoader;
  const initialState = {purchases: []};

  let snackBarServiceSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
  let apiServiceSpy = jasmine.createSpyObj('ApiService', ['makePostApiCall']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [PurchaseComponent],
      providers: [
        {provide: MatSnackBar, useValue: snackBarServiceSpy},
        {provide: ApiService, useValue: apiServiceSpy},
        provideMockStore({initialState})
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PurchaseComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);

    snackBarServiceSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have form defined after "OnInit" life cycle', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.purchaseForm).toBeDefined();
  });

  it('should have 5 inputs', async () => {
    const inputFields = await loader.getAllHarnesses(MatFormFieldHarness);
    expect(inputFields.length).toBe(5);
  });

  it('should have 2 buttons "Cancel" and "Submit"', async () => {
    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    expect(buttons.length).toBe(2);
  });

  it('should work', fakeAsync(async () => {
    const expectedResponse = true;
    const submitBtn = await loader.getHarness(MatButtonHarness.with({text: 'Submit'}));
    expect(submitBtn).toBeTruthy();

    apiServiceSpy.makePostApiCall.and.returnValue(of(expectedResponse));

    const form = component.purchaseForm;
    const dummyPurchase = PurchaseModel.dummy();
    form.get('cardNumber').setValue(dummyPurchase.cardNumber);
    form.get('holder').setValue(dummyPurchase.holder);
    form.get('expirationDate').setValue(dummyPurchase.expirationDate);
    form.get('amount').setValue(dummyPurchase.amount);
    form.get('ccv').setValue(dummyPurchase.ccv);

    fixture.detectChanges();

    await submitBtn.click();
    tick();
    expect(apiServiceSpy.makePostApiCall.calls.count()).toBe(1, 'Make Post API Call');
    expect(snackBarServiceSpy.open.calls.count()).toBe(1, 'Open Snack Bar');
  }));
});
