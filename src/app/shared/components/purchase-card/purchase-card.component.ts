import {Component, Input, OnInit} from '@angular/core';
import {PurchaseInterface} from '../../interfaces';

@Component({
  selector: 'fp-purchase-card',
  templateUrl: './purchase-card.component.html',
  styleUrls: ['./purchase-card.component.scss']
})
export class PurchaseCardComponent implements OnInit {
  @Input() purchase: PurchaseInterface;

  constructor() { }

  ngOnInit(): void {
  }

}
