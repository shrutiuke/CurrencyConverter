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
  levelBase : Array<any> = [];
  fromRates: Object = {};
  referarray: Array<any> = [];
  selectedLevel1: Array<any> = [];
  selectedLevel2: Array<any> = [];
  input: Array<any> = [];
  output: Array<any> = [];
  disclaimerFlag_0: boolean = false;
  disclaimerFlag_1: boolean = false;
  disclaimerFlag_2: boolean = false; 
  displayBlock: number;
  CurrencycorrectionFlag: boolean = false;
  butDisabled: boolean;
  CurrencycorrectionFlagreverse: boolean = false;

  constructor(private rateService: CurrencyrateService) { }

  ngOnInit() {
    this.currencyrate(true);
  };


  arrayOne(n: number): any[] {
    return Array(n);
  }
  
  
  showDisclaimer_0(event,value){
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    var id = value.split("_", 2)[1]; 
    this.disclaimerFlag_0= !this.disclaimerFlag_0;
  }

  showDisclaimer_1(event,value){
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    var id = value.split("_", 2)[1]; 
    this.displayBlock = 1;
    this.disclaimerFlag_1= !this.disclaimerFlag_1;
  }

  showDisclaimer_2(event,value){
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    var id = value.split("_", 2)[1]; 
    this.disclaimerFlag_2= !this.disclaimerFlag_2;
  } 
//   showDisclaimer(event,value) {

//     var target = event.target || event.srcElement || event.currentTarget;
//     var idAttr = target.attributes.id;
//     var value = idAttr.nodeValue;
//     var id = value.split("_", 2)[1];
//     var flagId = "disclaimerFlag_".concat(id);
 
//     this.disclaimerFlag= !this.disclaimerFlag;

//     if(id == 0){
//       this.displayBlock = 0;
//     }else if(id == 1){
//       this.displayBlock = 1;
//     }else if(id == 2){
//       this.displayBlock = 2;
//     }
//   }
 
  public currencyrate(service) {
    for (var i = 0; i < 3; i++) {
      this.rateService.getRates(this.selectedLevel1[i]).then(response => {
        if (response.rates) {
   
          if (service) {
            const items: Array<any> = this.parseData(response.rates);
            // items.push({ id: 'EUR', value: 1 });
            let base: string = null;
            base = response.base;
            let List: Array<any> = [];
            let BaseList : Array<any> = [];
            BaseList.push({id: "EUR", value: "1"});
            if (base === "EUR") {
              this.referarray = [{ id: "USD", value: 2 }, { id: "CAD", value: 3 }];
              List.push({ id: "EUR", value: 1 });
            }
            else if (base === "CAD") {
              this.referarray = [{ id: "USD", value: 2 }, { id: "EUR", value: 3 }];
              List.push({ id: "CAD", value: 1 });
            }
            else if (base === "USD") {
              this.referarray = [{ id: "CAD", value: 2 }, { id: "EUR", value: 3 }];
              List.push({ id: "USD", value: 1 });
            }

            for (var _i = 0; _i < items.length; _i++) {
              for (var _j = 0; _j < this.referarray.length; _j++) {
                 
                  
                if (items[_i].id === this.referarray[_j].id) {                 
                  
                  List.push({ id: items[_i].id, value: items[_i].value });
                }
              }
            }
            this.levels = List;
            this.levelBase = BaseList;
            this.referarray = this.referarray;
            this.currencyrate(false);

          }


          this.fromRates = response.rates;
          this.getCurrencyRate(true, false);
        };
      });
    };
  };


  onKey(event) {
    event = (event) ? event : window.event;
    var charCode = (event.which) ? event.which : event.keyCode;
    var parts = event.srcElement.value.split('.');
    var afterdecimalpart = parts[1]; 

    if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode != 190 && charCode != 110) && (charCode != 46 && charCode != 8) && (charCode < 96 || charCode > 105)) {
      this.CurrencycorrectionFlag = false;
      return false;
    }
    else if ((charCode == 190 || charCode == 110) && parts.length > 1 && (charCode != 46 && charCode != 8)) {
      this.CurrencycorrectionFlag = false;
      return false;
    }
    else if(afterdecimalpart.length > 1 && (charCode != 190 && charCode != 110) && (charCode != 46 && charCode != 8)) {
      this.CurrencycorrectionFlag = false;
      return false;
    }
    this.CurrencycorrectionFlag = true;
    return true;
  };


  onReverse(event) {
    event = (event) ? event : window.event;
    var charCode = (event.which) ? event.which : event.keyCode;
    var parts = event.srcElement.value.split('.');
    var afterdecimalpart = parts[1]; 
    
    if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode != 190 && charCode != 110) && (charCode != 46 && charCode != 8) && (charCode < 96 || charCode > 105)) {
      this.CurrencycorrectionFlagreverse = false;
      return false;
    }
    else if ((charCode == 190 || charCode == 110) && parts.length > 1 && (charCode != 46 && charCode != 8)) {
      this.CurrencycorrectionFlagreverse = false;
      return false;
    }
    else if(afterdecimalpart.length > 1 && (charCode != 190 && charCode != 110) && (charCode != 46 && charCode != 8)) {
      this.CurrencycorrectionFlag = false;
      return false;
    }
    this.CurrencycorrectionFlagreverse = true;
    return true;
  };


  public getCurrencyRate(initial, way) {

    for (var i = 0; i < 3; i++) {

      if (way) {
        if (initial) {
          if (this.selectedLevel1[i] === this.selectedLevel2[i]) { this.output[i] = this.input[i] }
          else {
            this.output[i] = Math.ceil((this.input[i] * this.fromRates[this.selectedLevel2[i]]) * 100) / 100;
          }
        }
        else {
          if (this.selectedLevel2[i] === this.selectedLevel1[i]) { this.input[i] = this.output[i] }
          else { this.input[i] = Math.ceil((this.output[i] / this.fromRates[this.selectedLevel2[i]]) * 100) / 100; }
        }
      }
      else {

        if (initial) {
          if (this.CurrencycorrectionFlag == true) {
            if (this.selectedLevel1[i] === this.selectedLevel2[i]) { this.output[i] = this.input[i] }
            else {
              this.output[i] = Math.ceil((this.input[i] * this.fromRates[this.selectedLevel2[i]]) * 100) / 100;
            }
          }
        }
        else {
          if (this.selectedLevel2[i] === this.selectedLevel1[i]) { this.input[i] = this.output[i] }
          else { this.input[i] = Math.ceil((this.output[i] / this.fromRates[this.selectedLevel2[i]]) * 100) / 100; }
        }
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
​
