import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {PurchaseInterface} from './shared/interfaces';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  cards$: Observable<PurchaseInterface[]>;

  constructor(private store: Store<{ cards: PurchaseInterface[] }>) {
    this.cards$ = store.select('cards');
  }
}
