import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddCardComponent} from './add-card/add-card.component';

const routes: Routes = [
  { path: 'add-card', component: AddCardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutedComponents = [
  AddCardComponent
];
