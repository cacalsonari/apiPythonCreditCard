import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCreditCardComponent } from './components/add-credit-card/add-credit-card.component';
import { CreditCardDetailsComponent } from './components/credit-card-details/credit-card-details.component';
import { CreditCardListComponent } from './components/credit-card-list/credit-card-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'credit-card', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'credit-card', component: CreditCardListComponent, canActivate: [AuthGuard]  },
  { path: 'credit-card/:id', component: CreditCardDetailsComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddCreditCardComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
