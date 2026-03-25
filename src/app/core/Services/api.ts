import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private url = 'https://ang-dnd.fundsforngospremium.com/api/USGrants/GetUSGrantsGridPaging';

  constructor(private http: HttpClient) {}

  getGrants(payload: any): Observable<any> {
    return this.http.post<any>(this.url, payload);
  }
}
