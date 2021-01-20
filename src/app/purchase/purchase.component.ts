import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PurchaseModel} from '../shared/models';
import {PurchaseService} from './purchase.service';
import {ToastService} from '../shared/services';
import {Subscription} from 'rxjs';

@Component({
  selector: 'cs-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
  providers: [PurchaseService]
})
export class PurchaseComponent implements OnInit, OnDestroy {
  purchaseForm: FormGroup;
  minDate = new Date();
  private _purchaseSub: Subscription;

  constructor(
    private _cardService: PurchaseService,
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
    const createdCard = new PurchaseModel(
      this.purchaseForm.get('cardNumber').value,
      this.purchaseForm.get('holder').value,
      this.purchaseForm.get('expirationDate').value,
      this.purchaseForm.get('ccv').value,
      this.purchaseForm.get('amount').value,
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
    this.purchaseForm = new FormGroup({
      cardNumber: new FormControl(null, [Validators.required]),
      holder: new FormControl(null, [Validators.required]),
      expirationDate: new FormControl(null, [Validators.required]),
      ccv: new FormControl(null, [Validators.minLength(3), Validators.maxLength(3)]),
      amount: new FormControl(null, [Validators.required])
    });
  }

}
