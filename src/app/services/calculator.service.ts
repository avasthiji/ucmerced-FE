import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  BaseURL:string= 'https://d4ba-2402-e280-2234-1f-d4ef-ab50-83f2-545.ngrok-free.app'
  headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('ngrok-skip-browser-warning', 'true')
  .set('Access-Control-Allow-Origin', '*');
  constructor(private http: HttpClient,) { }

  roiCalcuator(data:{}){
    const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('ngrok-skip-browser-warning', 'true')
  .set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${this.BaseURL}/api/roiCalculator`,data)
  }
  utilityCost(data:any){
  let params = new HttpParams();
  Object.keys(data).forEach(key => {
    params = params.append(key, data[key]);
  });

  //const headers = new HttpHeaders().set('ngrok-skip-browser-warning', '96420');
  // const headers= new HttpHeaders()
  // .set('content-type', 'application/json')
  // .set('ngrok-skip-browser-warning', 'true')
  // .set('Access-Control-Allow-Origin', '*');
  return this.http.get(`${this.BaseURL}/api/utilityCost`, { params: params,headers: this.headers });
  }

  getEthnicity(){
    return this.http.get(`${this.BaseURL}/api/ethnicity`,{ headers: this.headers })
  }
  getAgegroup(){
    return this.http.get(`${this.BaseURL}/api/agegroup`,{ headers: this.headers })
  }
  getCounties(){
    return this.http.get(`${this.BaseURL}/api/counties`,{ headers: this.headers })
  }
  getDiseases(){
    return this.http.get(`${this.BaseURL}/api/diseases`,{ headers: this.headers })
  }
  getRegions(){
    return this.http.get(`${this.BaseURL}/api/regions`, { headers: this.headers })
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
