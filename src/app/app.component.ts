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
  purchases$: Observable<PurchaseInterface[]>;

  constructor(private _store: Store<{ purchases: PurchaseInterface[] }>) {
    this.purchases$ = _store.select('purchases');
  }
}
