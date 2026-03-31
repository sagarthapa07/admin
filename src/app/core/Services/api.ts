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
    return this.http.post<any>(
      'https://ang-dnd.fundsforngospremium.com/api/USGrants/GetUSGrantsGridPaging',
      payload,
    );
  }

  // SearchDonors Api
  searchDonors(donorType: string, searchText: string): Observable<any> {
    return this.http.get<any>(
      `https://adminapi.grantsforus.app/api/USDonors/GetUSDonorsByType?donorType=${donorType}&searchText=${searchText}`,
    );
  }

  getTownShips(): Observable<any> {
    return this.http.get('https://ang-dnd.fundsforngospremium.com/api/TownShips/GetTownShips');
  }

  getInsularAreas(): Observable<any> {
    return this.http.get(
      'https://ang-dnd.fundsforngospremium.com/api/InsularAreas/GetInsularAreas',
    );
  }

  getCities(): Observable<any> {
    return this.http.get('https://ang-dnd.fundsforngospremium.com/api/Cities/GetCities');
  }

  getStates(): Observable<any> {
    return this.http.get('https://ang-dnd.fundsforngospremium.com/api/States/GetUSStates');
  }

  //Focus AReas k liye APis USe hori h yha se
  getFocusAreas(): Observable<any> {
    return this.http.get('https://ang-dnd.fundsforngospremium.com/api/FocusAreas/GetUSFocusAreas');
  }

  getFocusSubAreas(issueId: number): Observable<any> {
    return this.http.get(
      `https://ang-dnd.fundsforngospremium.com/api/FocusSubAreas/GetUSFocusSubAreasForArea?IssueId=${issueId}`,
    );
  }

  // Focus Group k liyeee APis used

  getBeneficiaries(): Observable<any> {
    return this.http.get(
      'https://ang-dnd.fundsforngospremium.com/api/Beneficiaries/GetBeneficiaries',
    );
  }

  // Entities API
  getEntities(): Observable<any> {
    return this.http.get('https://ang-dnd.fundsforngospremium.com/api/Entities/GetEntities');
  }

  getSubEntities(entId: number): Observable<any> {
    return this.http.get(
      `https://ang-dnd.fundsforngospremium.com/api/SubEntities/GetSubEntitiesForEntity?EntId=${entId}`,
    );
  }
}
