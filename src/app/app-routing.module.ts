import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'payment/:id',
    loadChildren: () => import('./pages/payment/payment.module').then(m => m.PaymentModule)
  },
  {
    path: 'terms-and-conditions',
    loadChildren: () => import('./pages/terms-and-conditions/terms-and-conditions.module').then(m => m.TermsAndConditionsModule)
  },
  {
    path: 'not-found',
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
