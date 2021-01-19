import {Component, Input, OnInit} from '@angular/core';
import {CreditCardInterface} from '../../interfaces';

@Component({
  selector: 'cs-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent implements OnInit {
  @Input() creditCard: CreditCardInterface;

  constructor() { }

  ngOnInit(): void {
  }

}
