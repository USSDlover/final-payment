import {createAction, props} from '@ngrx/store';
import {PurchaseInterface} from '../../shared/interfaces';

export const add = createAction(
  '[Store Card] Add',
  props<{ card: PurchaseInterface }>()
);
