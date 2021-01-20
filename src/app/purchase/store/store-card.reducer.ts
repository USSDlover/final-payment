import { createReducer, on } from '@ngrx/store';
import { add } from './store-card.actions';
import { PurchaseInterface } from '../../shared/interfaces';

export const initialState: PurchaseInterface[] = [];

const _addCardReducer = createReducer(
  initialState,
  on(add, (state, { card } ) => [...state, card]),
);

export function storeCardReducer(state, action): any[] {
  return _addCardReducer(state, action);
}
