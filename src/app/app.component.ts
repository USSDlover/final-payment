import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {CreditCardInterface} from './shared/interfaces';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  cards$: Observable<CreditCardInterface[]>;

  constructor(private store: Store<{ cards: CreditCardInterface[] }>) {
    this.cards$ = store.select('cards');
  }
}
