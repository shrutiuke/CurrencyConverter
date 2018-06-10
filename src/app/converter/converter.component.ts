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
  selectedLevel1: Array<any> = [];
  selectedLevel2: Array<any> = [];
  input: Array<any> = [];
  output: Array<any> = [];
  disclaimerFlag: boolean;
  CurrencycorrectionFlag: boolean;
  butDisabled: boolean;
  CurrencycorrectionFlagreverse:boolean;
  

  constructor(private rateService: CurrencyrateService) { }

  ngOnInit() {
   
    // this.output []= null;
    this.currencyrate(true);

   
  };

  arrayOne(n: number): any[]{
    return Array(n);
  }


   

  showDisclaimer() {
    this.disclaimerFlag = !this.disclaimerFlag;
  };


  public currencyrate(service) {

    for(var i=0 ; i<3 ; i++){
   
    this.rateService.getRates(this.selectedLevel1[i]).then(response => {
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
        this.selectedLevel1[i]= this.levels[0].id;
        this.selectedLevel2[i] = this.levels[2].id;
        this.referarray = this.referarray;
        this.currencyrate(false);
      }
     
        this.fromRates = response.rates;
        this.getCurrencyRate(true);
      

      };

    });
  };
};

  onKey(event){
      event = (event) ? event : window.event;
    var charCode = (event.which) ? event.which : event.keyCode;
    var parts = event.srcElement.value.split('.');
    if (charCode > 31 && (charCode < 48 || charCode > 57 ) && charCode != 46  ) {
        return false;
    }
    else if (charCode == 46 && parts.length >1){
      return false;
    }
    this.getCurrencyRate(true);

    return true;    

  };

  onReverse(event){
    event = (event) ? event : window.event;
  var charCode = (event.which) ? event.which : event.keyCode;
  var parts = event.srcElement.value.split('.');
  if (charCode > 31 && (charCode < 48 || charCode > 57 ) && charCode != 46  ) {
      return false;
  }
  else if (charCode == 46 && parts.length >1){
    return false;
  }
  this.getCurrencyRate(false);

  return true;    

};

  public getCurrencyRate(initial) { 


    for (var i=0; i<3; i++){
    
    if(initial){
      if(this.selectedLevel1[i] === this.selectedLevel2[i])
         {this.output[i] = this.input[i]}
    else{
      
      this.output[i] = Math.ceil((this.input[i] * this.fromRates[this.selectedLevel2[i]]) * 100) / 100;}    
       }

    else{
      if(this.selectedLevel2[i]=== this.selectedLevel1[i])
      {this.input[i] = this.output[i]}
          else{this.input[i] = Math.ceil((this.output[i] / this.fromRates[this.selectedLevel2[i]]) * 100) / 100;}    
    }
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

