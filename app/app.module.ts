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

import { RouterModule }   from '@angular/router';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api/in-memory-web-api.module';
import { InMemoryDataService }  from './in-memory-data.service';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { HighlightComponent }   from './highlight/highlight.component';
import { ProductSearchComponent }   from './product-search/product-search.component';
import { ProductsComponent }      from './product/products.component';
import { ProductDetailComponent }  from './product-detail/product-detail.component';
import { AppRoutingModule }     from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
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
    HighlightComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [ProductService],
  
})
export class AppModule { }
