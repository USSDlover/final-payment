import {Component, Input, OnInit} from '@angular/core';
import {PurchaseInterface} from '../../interfaces';

@Component({
  selector: 'cs-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent implements OnInit {
  @Input() creditCard: PurchaseInterface;

  constructor() { }

  ngOnInit(): void {
  }

}
