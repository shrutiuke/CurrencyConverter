import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';



import { AppComponent } from './app.component';
import { ConverterComponent } from './converter/converter.component';
import { CurrencyrateService } from './currencyrate.service';

@NgModule({
  declarations: [
    AppComponent,
    ConverterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
    
  ],
  providers: [CurrencyrateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
