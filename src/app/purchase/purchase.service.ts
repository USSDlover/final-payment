import {Injectable} from '@angular/core';
import {ApiService} from '../core/services';
import {PurchaseInterface} from '../shared/interfaces';
import {Store} from '@ngrx/store';
import {add} from './store/store-card.actions';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class PurchaseService {
  constructor(
    private api: ApiService,
    private store: Store<{ card: PurchaseInterface[] }>
  ) {
  }

  addNewCard(newCard: PurchaseInterface): Observable<boolean> {
    return this.api.makePostApiCall<boolean>('/purchase', newCard)
      .pipe(tap(res => {
        if (res) {
          this.addToStore(newCard);
        }
      }));
  }

  addToStore(card: PurchaseInterface): void {
    this.store.dispatch(add({ card }));
  }
}
