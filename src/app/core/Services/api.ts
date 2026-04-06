import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  GetBeneficiariesResponse,
  GetCitiesResponse,
  GetCountiesResponse,
  GetEntitiesResponse,
  GetFocusAreasResponse,
  GetFocusSubAreasResponse,
  GetInsularResponse,
  GetStatesResponse,
  GetSubEntitiesResponse,
  GetTownshipResponse,
  GrantApiResponse,
} from '../../datatype';

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
  getGrantById(id: number): Observable<GrantApiResponse> {
    return this.http.get<GrantApiResponse>(
      `https://ang-dnd.fundsforngospremium.com/api/USGrants/GetUSGrantsDetail?id=${id}`,
    );
  }

  // SearchDonors Api
  searchDonors(donorType: string, searchText: string): Observable<any> {
    return this.http.get<any>(
      `https://adminapi.grantsforus.app/api/USDonors/GetUSDonorsByType?donorType=${donorType}&searchText=${searchText}`,
    );
  }

  getTownShips(): Observable<GetTownshipResponse> {
    return this.http.get<GetTownshipResponse>(
      'https://ang-dnd.fundsforngospremium.com/api/TownShips/GetTownShips',
    );
  }

  getInsularAreas(): Observable<GetInsularResponse> {
    return this.http.get<GetInsularResponse>(
      'https://ang-dnd.fundsforngospremium.com/api/InsularAreas/GetInsularAreas',
    );
  }

  getCities(): Observable<GetCitiesResponse> {
    return this.http.get<GetCitiesResponse>(
      'https://ang-dnd.fundsforngospremium.com/api/Cities/GetCities',
    );
  }

  getStates(): Observable<GetStatesResponse> {
    return this.http.get<GetStatesResponse>(
      'https://ang-dnd.fundsforngospremium.com/api/States/GetUSStates',
    );
  }

  //Focus AReas k liye APis USe hori h yha se
  getFocusAreas(): Observable<GetFocusAreasResponse> {
    return this.http.get<GetFocusAreasResponse>(
      'https://ang-dnd.fundsforngospremium.com/api/FocusAreas/GetUSFocusAreas',
    );
  }
  getFocusSubAreas(issueId: number): Observable<GetFocusSubAreasResponse> {
    return this.http.get<GetFocusSubAreasResponse>(
      `https://ang-dnd.fundsforngospremium.com/api/FocusSubAreas/GetUSFocusSubAreasForArea?IssueId=${issueId}`,
    );
  }

  // Focus Group k liyeee APis used

  getBeneficiaries(): Observable<GetBeneficiariesResponse> {
    return this.http.get<GetBeneficiariesResponse>(
      'https://ang-dnd.fundsforngospremium.com/api/Beneficiaries/GetBeneficiaries',
    );
  }

  // Entities API
  getEntities(): Observable<GetEntitiesResponse> {
    return this.http.get<GetEntitiesResponse>(
      'https://ang-dnd.fundsforngospremium.com/api/Entities/GetEntities',
    );
  }

  getSubEntities(entId: number): Observable<GetSubEntitiesResponse> {
    return this.http.get<GetSubEntitiesResponse>(
      `https://ang-dnd.fundsforngospremium.com/api/SubEntities/GetSubEntitiesForEntity?EntId=${entId}`,
    );
  }

  // Counties
  //   ye hai State k Data ko get krnae k liye jo dropdown mai use hoga
  getAllStates(): Observable<GetStatesResponse> {
    return this.http.get<GetStatesResponse>(
      'https://ang-dnd.fundsforngospremium.com/api/States/GetAllStates',
    );
  }

  // ye hai kisi state ki county ko get krne k liye
  getCountiesByState(stateId: number): Observable<GetCountiesResponse> {
    return this.http.get<GetCountiesResponse>(
      `https://ang-dnd.fundsforngospremium.com/api/GEOCounties/GetGEOCountiesForStates?StateID=${stateId}`,
    );
  }
}
