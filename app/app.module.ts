import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';
import { PriceCalculatorComponent } from './price-calculator.component';
import { CalculatePricePipe } from './calculate-price.pipe';
import { ProductService } from './product.service';
import { HighlightDirective } from './highlight.directive';

import { RouterModule }   from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { ProductsComponent }      from './products.component';
import { ProductDetailComponent }  from './product-detail.component';
import { AppRoutingModule }     from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [ 
    AppComponent,
    ProductDetailComponent,
    PriceCalculatorComponent,
    CalculatePricePipe,
    HighlightDirective,
    DashboardComponent,
    ProductsComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [ProductService],
  
})
export class AppModule { }
