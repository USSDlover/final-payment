import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CreditCardModel} from '../shared/models';
import {CardService} from './card.service';

@Component({
  selector: 'cs-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss'],
  providers: [CardService]
})
export class AddCardComponent implements OnInit {
  addCardForm: FormGroup;

  constructor(private cardService: CardService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(): boolean {
    const createdCard = new CreditCardModel(
      this.addCardForm.get('cardNumber').value,
      this.addCardForm.get('holder').value,
      this.addCardForm.get('expirationDate').value,
      this.addCardForm.get('ccv').value,
      this.addCardForm.get('amount').value,
    );

    this.cardService.addNewCard(createdCard);

    return false;
  }

  private initForm(): void {
    this.addCardForm = new FormGroup({
      cardNumber: new FormControl(null, [Validators.required]),
      holder: new FormControl(null, [Validators.required]),
      expirationDate: new FormControl(null, [Validators.required]),
      ccv: new FormControl(null, [Validators.minLength(3), Validators.maxLength(3)]),
      amount: new FormControl(null, [Validators.required])
    });
  }

}
