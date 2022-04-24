import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../models/country.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesListService {

  constructor(private _http: HttpClient) { }

  getCountries(url: string): Observable<Country[]> {
    return this._http.get<Country[]>(url)
  }
}
