import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditCardComponent, ToastComponent } from './components';

const components = [
  CreditCardComponent,
  ToastComponent
];

const modules = [
  CommonModule
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components]
})
export class SharedModule { }
