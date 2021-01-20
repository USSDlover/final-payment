import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditCardComponent, ToastComponent } from './components';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { CardNumberPipe } from './pipes';

const components = [
  CreditCardComponent,
  ToastComponent
];

const pipes = [
  CardNumberPipe
];

const AngularMaterials = [
  MatToolbarModule,
  MatFormFieldModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule
];

const modules = [
  CommonModule,
  ...AngularMaterials
];

@NgModule({
  declarations: [...components, ...pipes],
  imports: [...modules],
  exports: [...components, ...modules, ...pipes]
})
export class SharedModule { }
