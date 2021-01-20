import {Injectable} from '@angular/core';
import {ApiService} from '../core/services';
import {CreditCardInterface} from '../shared/interfaces';
import {Store} from '@ngrx/store';
import {add} from './add-card.actions';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class CardService {
  constructor(
    private api: ApiService,
    private store: Store<{ card: CreditCardInterface[] }>
  ) {
  }

  addNewCard(newCard: CreditCardInterface): Observable<boolean> {
    return this.api.makePostApiCall<boolean>('/purchase', newCard)
      .pipe(tap(res => {
        if (res) {
          this.addToStore(newCard);
        }
      }));
  }

  addToStore(card: CreditCardInterface): void {
    this.store.dispatch(add({ card }));
  }
}
