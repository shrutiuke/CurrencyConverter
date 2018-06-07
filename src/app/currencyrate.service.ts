import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

// import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class CurrencyrateService {

  constructor( private http: Http) { }

//   rateurl = "https://api.fixer.io/latest";
  
  rateurl = "http://data.fixer.io/api/latest?access_key=1d067d54e5c1cc65124ed6b77358a3df&format=1";

 
  getRates(selectedLevel1): Promise<any> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
console.log(selectedLevel1);
    let url: string;
    if (selectedLevel1) {
      url = this.rateurl + '?base=' + selectedLevel1;
    } else {
      url = this.rateurl+'?base=USD';
    }
    console.log(url);
   
    return this.http.get(url).toPromise()
      .then(this.getRate)
      .catch(this.handleError);

  }

  getRate(res: Response) {
    let body = res.json();
    return body;
  }



  private handleError(error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }
}
