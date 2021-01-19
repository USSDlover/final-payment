import {createAction, props} from '@ngrx/store';
import {CreditCardInterface} from '../shared/interfaces';

export const add = createAction(
  '[Store Card] Add',
  props<{ card: CreditCardInterface }>()
);
