import {Injectable} from '@angular/core';
import {ApiService} from '../core/services';
import {CreditCardInterface} from '../shared/interfaces';
import {Store} from '@ngrx/store';
import {add} from './add-card.actions';

@Injectable()
export class CardService {
  constructor(
    private api: ApiService,
    private store: Store<{ card: CreditCardInterface[] }>
  ) {
  }

  addNewCard(newCard: CreditCardInterface): void {
    this.addToStore(newCard);
  }

  addToStore(card: CreditCardInterface): void {
    this.store.dispatch(add({ card }));
  }
}
