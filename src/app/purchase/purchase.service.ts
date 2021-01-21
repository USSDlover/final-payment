import {Injectable} from '@angular/core';
import {ApiService} from '../core/services';
import {PurchaseInterface} from '../shared/interfaces';
import {Store} from '@ngrx/store';
import {add} from './store/store-purchase.actions';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class PurchaseService {
  constructor(
    private _api: ApiService,
    private _store: Store<{ card: PurchaseInterface[] }>
  ) {
  }

  addNewCard(newPurchase: PurchaseInterface): Observable<boolean> {
    return this._api.makePostApiCall<boolean>('/purchase', newPurchase)
      .pipe(tap(res => {
        if (res) {
          this._addToStore(newPurchase);
        }
      }));
  }

  private _addToStore(purchase: PurchaseInterface): void {
    this._store.dispatch(add({ purchase }));
  }
}
