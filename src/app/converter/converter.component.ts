import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { CurrencyrateService } from '../currencyrate.service';




@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css'],
  providers: [CurrencyrateService]
})

export class ConverterComponent implements OnInit {

  name: string;
  levelNum: number;
  levels: Array<any> = [];
  fromRates: Object = {};
  referarray: Array<any> = [];
  selectedLevel1: string = null;
  selectedLevel2: string = null;
  input: number;
  output: number;
  disclaimerFlag: boolean;
  CurrencycorrectionFlag: boolean;
  butDisabled: boolean;
  CurrencycorrectionFlagreverse:boolean;
 

  constructor(private rateService: CurrencyrateService) { }

  ngOnInit() {
   
    this.output = null;
    this.currencyrate(true);

   
  };


   

  showDisclaimer() {
    this.disclaimerFlag = !this.disclaimerFlag;
  };


  public currencyrate(service) {
   
    this.rateService.getRates(this.selectedLevel1).then(response => {
      if (response.rates) {
        if(service){        
        const items: Array<any> = this.parseData(response.rates);
        // items.push({ id: 'EUR', value: 1 });
        let base:string = null;
        base = response.base;

        let List: Array<any> = [];
       
        if(base === "USD"){
           this.referarray = [ { id: "CAD", value: 2 }, { id: "EUR", value: 3 }];
          List.push({ id: "USD", value: 1 });
        }
        else if(base === "CAD"){
           this.referarray = [ { id: "USD", value: 2 }, { id: "EUR", value: 3 }];
          List.push({ id: "CAD", value: 1 });
        }
        else if   (base === "EUR"){
           this.referarray = [ { id: "USD", value: 2 }, { id: "CAD", value: 3 }];
          List.push({ id: "EUR", value: 1 });
        }

        

        for (var _i = 0; _i < items.length; _i++) {
          for (var _j = 0; _j < this.referarray.length; _j++) {
            if (items[_i].id === this.referarray[_j].id) {
              List.push({ id: items[_i].id, value: items[_i].value });
            }
          }
        }
      

        this.levels = List;
        this.selectedLevel1 = this.levels[0].id;
        this.selectedLevel2 = this.levels[2].id;
        this.referarray = this.referarray;
        this.currencyrate(false);
      }
     
        this.fromRates = response.rates;
        this.getCurrencyRate(true);
      

      };

    });
  };

  onKey(initial){
    this.CurrencycorrectionFlag = false;
    this.CurrencycorrectionFlagreverse = false;    
    const pattern = /^(?:[1-9]\d*)(?:\.(?!.*000)\d+)?$/;
    let inputChar = null;

    if(initial){

       inputChar = this.input.toString();

       if (!pattern.test( inputChar)) {
        this.CurrencycorrectionFlag = true;
        this.butDisabled = true;
        this.output = null;      
       
      }else{
        this.butDisabled = false;     
        this.getCurrencyRate(true);
      }
    }
    else{
       inputChar = this.output.toString();

       if (!pattern.test( inputChar)) {
        this.CurrencycorrectionFlagreverse = true;
        this.butDisabled = true;
        this.output = null;      
       
      }else{
        this.butDisabled = false;     
        this.getCurrencyRate(false);
      }
    }

  };

  public getCurrencyRate(initial) {   
    
    if(initial){
      if(this.selectedLevel1 === this.selectedLevel2)
         {this.output = this.input}
    else{this.output = Math.ceil((this.input * this.fromRates[this.selectedLevel2]) * 100) / 100;}    
       }

    else{
      if(this.selectedLevel2 === this.selectedLevel1)
      {this.input = this.output}
          else{this.input = Math.ceil((this.output / this.fromRates[this.selectedLevel2]) * 100) / 100;}    
    }
    }


    

  private parseData(data) {
    const arr: Array<any> = [];
    for (const key in data) {
      if (key) {
        const obj = {
          id: key,
          value: data[key]
        };
        arr.push(obj);
      }
    }
    return arr;
  }


}

