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
  utilityCost(data:{}){
  // Convert data object into query parameters
  let params = new HttpParams();
  // Object.keys(data).forEach(key => {
  //   params = params.append(key, data[key]);
  // });
  console.log(params)

  // Make GET request with the data as query parameters
  return this.http.get(`${this.BaseURL}/utilityCost?region=1,2&county=1,7,21,28,38,41,43,48,49&disease=1&ethnicity=2&ageGroup=1-10&sex=Male`, { params: params });
  }
}
