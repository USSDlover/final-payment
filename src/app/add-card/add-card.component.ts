import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CreditCardInterface} from '../shared/interfaces/';
import {CardService} from '../shared/services';
import {CreditCardModel} from '../shared/models';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit {
  @Input() card: CreditCardInterface;

  addCardForm: FormGroup;

  constructor(private cardService: CardService) {
  }

  ngOnInit(): void {
    this.initForm(this.card);
  }

  onSubmit(): void {
    const createdCard = new CreditCardModel(
      this.addCardForm.get('cardNumber').value,
      this.addCardForm.get('holder').value,
      this.addCardForm.get('expirationDate').value,
      this.addCardForm.get('ccv').value,
      this.addCardForm.get('amount').value,
    );

    this.cardService.addNewCard(createdCard);
  }

  private initForm(card: CreditCardInterface): void {
    this.addCardForm = new FormGroup({
      cardNumber: new FormControl(card?.cardNumber ?? null, [Validators.required]),
      holder: new FormControl(card?.holder ?? null, [Validators.required]),
      expirationDate: new FormControl(card?.expirationDate ?? null, [Validators.required]),
      ccv: new FormControl(card?.ccv ?? null, [Validators.minLength(3), Validators.maxLength(3)]),
      amount: new FormControl(card?.amount ?? null, [Validators.required])
    });
  }

}
