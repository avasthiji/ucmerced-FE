import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  BaseURL:string= 'https://eaa0-223-233-66-243.ngrok-free.app/api'
  constructor(private http: HttpClient,) { }

  roiCalcuator(data:{}){
    return this.http.post(`${this.BaseURL}/roiCalculator`,data)
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
  return this.http.get(`${this.BaseURL}/utilityCost1`, { params: params,headers: headers });
  }
}
