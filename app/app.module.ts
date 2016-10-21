import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';
import { ProductDetailComponent } from './product-detail.component';
import { PriceCalculatorComponent } from './price-calculator.component';
import { CalculatePricePipe } from './calculate-price.pipe';
import { ProductService } from './product.service';
import { HighlightDirective } from './highlight.directive';

@NgModule({
  imports: [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, ProductDetailComponent, PriceCalculatorComponent, CalculatePricePipe, HighlightDirective ],
  bootstrap: [ AppComponent ],
  providers: [ProductService]
})
export class AppModule { }
