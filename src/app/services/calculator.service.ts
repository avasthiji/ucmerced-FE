import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  BaseURL:string= 'https://ea24-223-233-72-198.ngrok-free.app'
  constructor(private http: HttpClient,) { }

  roiCalcuator(data:{}){
    return this.http.post(`${this.BaseURL}/api/roiCalculator`,data)
  }
  utilityCost(data:any){
  let params = new HttpParams();
  Object.keys(data).forEach(key => {
    params = params.append(key, data[key]);
  });
  //const headers = new HttpHeaders().set('ngrok-skip-browser-warning', '96420');
  const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('ngrok-skip-browser-warning', 'true')
  .set('Access-Control-Allow-Origin', '*');
  return this.http.get(`${this.BaseURL}/api/utilityCost`, { params: params,headers: headers });
  }

  getEthnicity(){
    return this.http.get(`${this.BaseURL}/api/ethnicity`)
  }
  getAgegroup(){
    return this.http.get(`${this.BaseURL}/api/agegroup`)
  }
  getCounties(){
    return this.http.get(`${this.BaseURL}/api/counties`)
  }
  getDiseases(){
    return this.http.get(`${this.BaseURL}/api/diseases`)
  }
  getRegions(){
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('ngrok-skip-browser-warning', 'true')
    .set('Access-Control-Allow-Origin', '*');
    return this.http.get(`${this.BaseURL}/api/regions`, { headers: headers })
  }
  exportTotalCostData(data:any){
    let params = new HttpParams();
    Object.keys(data).forEach(key => {
      params = params.append(key, data[key]);
    });
    const headers= new HttpHeaders()
    return this.http.get(`${this.BaseURL}/api/exportData`,{ params: params,headers: headers })
  }



}
