import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import './rxjs-extensions';

import { AppComponent }  from './app.component';
import { PriceCalculatorComponent } from './calculator/price-calculator.component';
import { CalculatePricePipe } from './calculator/calculate-price.pipe';
import { ProductService } from './product/product.service';
import { HighlightDirective } from './highlight/highlight.directive';
import { Logger } from "angular2-logger/core";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { RouterModule }   from '@angular/router';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { HighlightComponent }   from './highlight/highlight.component';
import { ProductSearchComponent }   from './product-search/product-search.component';
import { ProductsComponent }      from './product/products.component';
import { ProductDetailComponent }  from './product-detail/product-detail.component';
import { ProductFormComponent }  from './product-form/product-form.component';
import { AppRoutingModule }     from './app-routing.module';
import { Configuration } from './app.config';
import { LoginComponent } from './user/login.component';
import { AuthGuard } from './_guards/index';
import { AuthenticationService } from './_services/index';
import { OrderComponent } from './order/order.component';
import { OrderService } from './order/order.service';
import { SharedService } from './shared.service';
import { RegisterComponent } from './user/register.component';
import { UserService } from './user/user.service';

let localStorageServiceConfig = {
    prefix: 'my-app',
    storageType: 'sessionStorage'
};

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    NgbModule.forRoot(),
    //InMemoryWebApiModule.forRoot(InMemoryDataService),
  ],
  declarations: [ 
    AppComponent,
    ProductDetailComponent,
    PriceCalculatorComponent,
    CalculatePricePipe,
    HighlightDirective,
    DashboardComponent,
    ProductsComponent,
    ProductSearchComponent,
    HighlightComponent,
    ProductFormComponent,
    LoginComponent,
    OrderComponent,
    RegisterComponent,
  ],
  bootstrap: [ AppComponent ],
  providers: [
    ProductService,
    Logger,
    Configuration,
    AuthGuard,
    AuthenticationService,
    OrderService,
    SharedService,
    UserService,
  ],
})
export class AppModule { }
