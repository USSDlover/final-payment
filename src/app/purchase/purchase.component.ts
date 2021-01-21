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
    const purchase = new PurchaseModel(
      this.purchaseForm.get('cardNumber').value,
      this.purchaseForm.get('holder').value,
      this.purchaseForm.get('expirationDate').value,
      this.purchaseForm.get('amount').value,
      this.purchaseForm.get('ccv').value,
    );

    this._savePurchaseData(purchase);

    return false;
  }

  validateSelectedDate(selectedDate: string): void {
    const date = new Date(selectedDate);
    if (date.getDate() <= new Date().getDate()) {
      this.expirationDate.setErrors([{badDate: {value: selectedDate}}]);
    }
  }

  private _savePurchaseData(data: PurchaseModel): void {
    this._purchaseSub = this._cardService.addNewCard(data)
      .subscribe(res => {
        if (res) {
          this._toastService.open('Purchase successfully done', 3000);
        }
      });
  }

  private _initForm(): void {
    this.purchaseForm = new FormGroup({
      cardNumber: new FormControl(null, [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(16),
        Validators.pattern(/\d/)
      ]),
      holder: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
      expirationDate: new FormControl(null, [
        Validators.required,
        Validators.min(this.minDate.getDate())]),
      ccv: new FormControl(null, [
        Validators.minLength(3),
        Validators.maxLength(3),
        Validators.pattern(/\d/)
      ]),
      amount: new FormControl(null, [
        Validators.required,
        Validators.min(0),
        Validators.pattern(/\d/)
      ])
    });
  }

  get cardNumber(): FormControl {
    return this.purchaseForm.get('cardNumber') as FormControl;
  }

  get holder(): FormControl {
    return this.purchaseForm.get('holder') as FormControl;
  }

  get expirationDate(): FormControl {
    return this.purchaseForm.get('expirationDate') as FormControl;
  }

  get ccv(): FormControl {
    return this.purchaseForm.get('ccv') as FormControl;
  }

  get amount(): FormControl {
    return this.purchaseForm.get('amount') as FormControl;
  }

}
