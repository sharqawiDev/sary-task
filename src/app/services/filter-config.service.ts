import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterConfig } from '../models/filter-config.model';

@Injectable({
  providedIn: 'root'
})
export class FilterConfigService {

  constructor(private _http: HttpClient) { }

  getFiltersConfig(): Observable<FilterConfig[]> {
    return this._http.get<FilterConfig[]>('assets/data/filters.json')
  }
}
