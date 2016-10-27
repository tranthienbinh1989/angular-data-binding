import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { ProductsComponent }      from './product/products.component';
import { ProductDetailComponent }  from './product-detail/product-detail.component';
import { HighlightComponent }  from './highlight/highlight.component';
import { PriceCalculatorComponent }  from './calculator/price-calculator.component';
import { ProductFormComponent }  from './product-form/product-form.component';
import { AuthGuard } from './_guards/index';
import { LoginComponent } from './user/login.component';
import { OrderComponent } from './order/order.component';
import { RegisterComponent } from './user/register.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '',  component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products/:id', component: ProductFormComponent },
  { path: 'products/detail/:id', component: ProductDetailComponent },
  { path: 'products',   component: ProductsComponent },
  { path: 'checkout',   component: OrderComponent },
  { path: 'users/profile',   component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'new-product',  component: ProductFormComponent, canActivate: [AuthGuard] },
  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
