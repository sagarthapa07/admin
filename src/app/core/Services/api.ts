import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {

  constructor(private http: HttpClient) {}


  // Grant Grid Api 
  getGrants(payload: any): Observable<any> {
    return this.http.post<any>('https://ang-dnd.fundsforngospremium.com/api/USGrants/GetUSGrantsGridPaging', payload);
  }

  // SearchDonors Api
  searchDonors(donorType: string, searchText: string): Observable<any> {
  return this.http.get<any>(
    `https://adminapi.grantsforus.app/api/USDonors/GetUSDonorsByType?donorType=${donorType}&searchText=${searchText}`
  );
}
}
