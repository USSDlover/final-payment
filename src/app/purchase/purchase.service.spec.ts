import {PurchaseService} from './purchase.service';
import {TestBed} from '@angular/core/testing';
import {ApiService} from '../core/services';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {PurchaseModel} from '../shared/models';
import {of} from 'rxjs';

describe('PurchaseService', () => {
  let purchaseService: PurchaseService;
  let apiSpy = jasmine.createSpyObj('ApiService', ['makePostApiCall']);

  let store: MockStore;
  const initialState = {purchases: []};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PurchaseService,
        {provide: ApiService, useValue: apiSpy},
        provideMockStore({initialState})
      ]
    });

    store = TestBed.inject(MockStore);
    purchaseService = TestBed.inject(PurchaseService);
    apiSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should create', async () => {
    expect(purchaseService).toBeTruthy();
  });

  it('should return expected purchase result', async () => {
    const expectedResult = true;
    apiSpy.makePostApiCall.and.returnValue(of(expectedResult));

    const addRes = await purchaseService.sendPurchaseRequest(PurchaseModel.dummy()).toPromise();

    expect(addRes).toEqual(expectedResult, 'expect true');

    expect(apiSpy.makePostApiCall.calls.count()).toBe(1, 'one call');
  });
});
