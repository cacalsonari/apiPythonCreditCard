import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCreditCardComponent } from './components/add-credit-card/add-credit-card.component';
import { CreditCardDetailsComponent } from './components/credit-card-details/credit-card-details.component';
import { CreditCardListComponent } from './components/credit-card-list/credit-card-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'credit-card', pathMatch: 'full' },
  { path: 'credit-card', component: CreditCardListComponent },
  { path: 'credit-card/:id', component: CreditCardDetailsComponent },
  { path: 'add', component: AddCreditCardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
