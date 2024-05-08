import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  BaseURL: string = 'https://e9e2-223-233-72-85.ngrok-free.app' //environment.BASEURL
  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('ngrok-skip-browser-warning', 'true')
    .set('Access-Control-Allow-Origin', '*');
  constructor(private http: HttpClient,) { }

  roiCalcuator(data: {}) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('ngrok-skip-browser-warning', 'true')
      .set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${this.BaseURL}/api/roiCalculator`, data)
  }
  utilityCost(data: any) {
    let params = new HttpParams();
    Object.keys(data).forEach(key => {
      params = params.append(key, data[key]);
    });
    return this.http.get(`${this.BaseURL}/api/utilityCost`, { params: params, headers: this.headers });
  }
  exportTotalCostData(data: any) {
    let params = new HttpParams();
    Object.keys(data).forEach(key => {
      params = params.append(key, data[key]);
    });
    const headers = new HttpHeaders()
    return this.http.get(`${this.BaseURL}/api/exportData`, { params: params, headers: headers })
  }

  getEthnicity() {
    return this.http.get(`${this.BaseURL}/api/ethnicity`, { headers: this.headers })
  }
  getAgegroup() {
    return this.http.get(`${this.BaseURL}/api/agegroup`, { headers: this.headers })
  }
  getCounties() {
    return this.http.get(`${this.BaseURL}/api/counties`, { headers: this.headers })
  }
  getDiseases() {
    return this.http.get(`${this.BaseURL}/api/diseases`, { headers: this.headers })
  }
  getRegions() {
    return this.http.get(`${this.BaseURL}/api/regions`, { headers: this.headers })
  }



}
