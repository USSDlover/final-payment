import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PurchaseModel} from '../shared/models';
import {PurchaseService} from './purchase.service';
import {Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'cs-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit, OnDestroy {
  purchaseForm: FormGroup;
  private _purchaseSub: Subscription;

  constructor(
    private _purchaseService: PurchaseService,
    private _snackBarService: MatSnackBar
  ) {
  }

  // region <Life Cycles>

  ngOnInit(): void {
    this._initForm();
  }

  ngOnDestroy(): void {
    if (this._purchaseSub) {
      this._purchaseSub.unsubscribe();
    }
  }

  // endregion

  // region <Form Actions>

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

  private _savePurchaseData(data: PurchaseModel): void {
    this._purchaseSub = this._purchaseService.addNewCard(data)
      .subscribe({
        next: res => {
          if (res) {
            this._snackBarService.open('Purchase successfully done', 'X', {duration: 3000});
          }
        },
        error: err => {
          console.log('Got error while trying to save purchase data', err.message);
          this._snackBarService.open('Something went wrong, please try again', 'X', {duration: 3000});
        },
        complete: () => {}
      });
  }

  // endregion

  // region <Initializing and validating form>

  validateSelectedDate(selectedDate: string): void {
    const date = new Date(selectedDate);
    if (date.getDate() <= new Date().getDate()) {
      this.expirationDate.setErrors([{badDate: {value: selectedDate}}]);
    }
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
        Validators.required]),
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

  // endregion

}
