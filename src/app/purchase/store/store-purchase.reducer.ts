import { createReducer, on } from '@ngrx/store';
import { add } from './store-purchase.actions';
import { PurchaseInterface } from '../../shared/interfaces';

export const initialState: PurchaseInterface[] = [];

const _storePurchaseReducer = createReducer(
  initialState,
  on(add, (state, { purchase } ) => [...state, purchase]),
);

export function storePurchaseReducer(state, action): any[] {
  return _storePurchaseReducer(state, action);
}
