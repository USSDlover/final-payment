import { createReducer, on } from '@ngrx/store';
import { add } from './add-card.actions';
import { CreditCardInterface } from '../shared/interfaces';

export const initialState: CreditCardInterface[] = [];

const _addCardReducer = createReducer(
  initialState,
  on(add, (state, { card } ) => [...state, card]),
);

export function addCardReducer(state, action): any[] {
  return _addCardReducer(state, action);
}
