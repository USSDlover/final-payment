import {Injectable} from '@angular/core';
import {ApiService} from '../../core/services';
import {CreditCardInterface} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  constructor(private api: ApiService) {
  }

  addNewCard(newCard: CreditCardInterface): void {
  }
}
