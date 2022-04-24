import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../models/hero.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesListService {

  constructor(private _http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this._http.get<Hero[]>('assets/data/heroes.json')
  }
}
