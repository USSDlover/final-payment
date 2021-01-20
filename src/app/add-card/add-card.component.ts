import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CreditCardModel} from '../shared/models';
import {CardService} from './card.service';
import {ToastService} from '../shared/services';
import {Subscription} from 'rxjs';

@Component({
  selector: 'cs-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss'],
  providers: [CardService]
})
export class AddCardComponent implements OnInit, OnDestroy {
  addCardForm: FormGroup;
  private _purchaseSub: Subscription;

  constructor(
    private _cardService: CardService,
    private _toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this._initForm();
  }

  ngOnDestroy(): void {
    if (this._purchaseSub) {
      this._purchaseSub.unsubscribe();
    }
  }

  onSubmit(): boolean {
    const createdCard = new CreditCardModel(
      this.addCardForm.get('cardNumber').value,
      this.addCardForm.get('holder').value,
      this.addCardForm.get('expirationDate').value,
      this.addCardForm.get('ccv').value,
      this.addCardForm.get('amount').value,
    );

    this._purchaseSub = this._cardService.addNewCard(createdCard)
      .subscribe(res => {
        if (res) {
          this._toastService.open('Purchase successfully done', 3000);
        }
      });

    return false;
  }

  private _initForm(): void {
    this.addCardForm = new FormGroup({
      cardNumber: new FormControl(null, [Validators.required]),
      holder: new FormControl(null, [Validators.required]),
      expirationDate: new FormControl(null, [Validators.required]),
      ccv: new FormControl(null, [Validators.minLength(3), Validators.maxLength(3)]),
      amount: new FormControl(null, [Validators.required])
    });
  }

}
