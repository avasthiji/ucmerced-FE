import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  //BaseURL: string = 'http://54.147.199.48' //environment.BASEURL
  BaseURL: string = 'https://calc.behavioralhealtheconph.org'
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
    return this.http.get(`${this.BaseURL}/api/utilityCost`, { params: params });
  }
  exportTotalCostData(data: any) {
    let params = new HttpParams();
    Object.keys(data).forEach(key => {
      params = params.append(key, data[key]);
    });
    const headers = new HttpHeaders()
    return this.http.get(`${this.BaseURL}/api/exportData`, { params: params })
  }

  getEthnicity() {
    return this.http.get(`${this.BaseURL}/api/ethnicity`)
  }
  getAgegroup() {
    return this.http.get(`${this.BaseURL}/api/agegroup`)
  }
  getCounties() {
    return this.http.get(`${this.BaseURL}/api/counties`)
  }
  getDiseases() {
    return this.http.get(`${this.BaseURL}/api/diseases`)
  }
  getRegions() {
    return this.http.get(`${this.BaseURL}/api/regions`)
  }



}
