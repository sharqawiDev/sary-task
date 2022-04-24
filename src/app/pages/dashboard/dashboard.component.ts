import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Country } from 'src/app/models/country.model';
import { FilterConfig } from 'src/app/models/filter-config.model';
import { Hero } from 'src/app/models/hero.model';
import { CountriesListService } from 'src/app/services/countries-list.service';
import { FilterConfigService } from 'src/app/services/filter-config.service';
import { HeroesListService } from 'src/app/services/heroes-list.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('filtersDiv') filtersDiv!: ElementRef
  @ViewChild('resultsDiv') resultsDiv!: ElementRef
  public filters: FilterConfig[]
  public filtersCollapsed: boolean = false
  public countriesList: Country[]
  public heroes: Hero[]
  public sortedHeroes: Hero[] | undefined
  public searchResults: Hero[] | undefined
  public filteredHeroes: Hero[] | undefined
  public heroesSorted: boolean = false
  public displayedColumns: string[] = ['Name', 'Phone', 'Email', 'Date', 'Country', 'Company'];
  public searchClicked: boolean = false;
  public formValues: any = {}
  constructor(
    private _filtersConfigService: FilterConfigService,
    private _countriesListService: CountriesListService,
    private _heroesListService: HeroesListService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
  }

  ngOnInit(): void {
    this.getFilters();
    this.getHeroes();
    this.getQueryParams()
  }

  getQueryParams() {
    this._route.queryParams
      .subscribe(params => this.formValues = { ...params })
  }

  getFilters() {
    this._filtersConfigService.getFiltersConfig().subscribe(res => {
      this.filters = res
      this.getCountries()
    })
  }

  getCountries() {
    const url = this.filters.find(filter => filter.type === 'dropdown')?.api as string
    this._countriesListService.getCountries(url).subscribe(res => this.countriesList = res)

  }

  getHeroes() {
    this._heroesListService.getHeroes().subscribe(res => this.heroes = res)
  }

  getCountryName(element: Hero) {
    if (this.countriesList) {
      let name = this.countriesList.find(country => country.alpha2Code === element.country)?.name.split(' ')
      if (name) {
        if (name.length > 3)
          return `${name[0]} ${name[1]} ${name[2]}`
        return name
      } else return ''
    }
    else return ''
  }

  triggerSearch() {
    if (this.searchClicked) {
      this.searchResults = undefined
      this.searchClicked = false
    }
    else this.searchClicked = true
  }

  searchHeroes(searchEvent: any) {
    let searchText = searchEvent?.target?.value as string;
    this.searchResults = this.heroes.filter(hero =>
      hero.name.toLowerCase().includes(searchText.trim().toLowerCase()) ||
      hero.phone.toLowerCase().includes(searchText.trim().toLowerCase()) ||
      hero.email.toLowerCase().includes(searchText.trim().toLowerCase()) ||
      hero.date.toLowerCase().includes(searchText.trim().toLowerCase()) ||
      hero.country.toLowerCase().includes(searchText.trim().toLowerCase()) ||
      hero.company.toLowerCase().includes(searchText.trim().toLowerCase())
    )

  }

  sortHeroes() {
    if (this.heroesSorted) {
      this.sortedHeroes = undefined
      this.heroesSorted = false;
    }
    else {
      this.sortedHeroes = [...this.heroes]
      this.sortedHeroes.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      })
      this.heroesSorted = true;
    }
  }

  triggerCollapse() {
    if (this.filtersCollapsed) {
      this.resultsDiv.nativeElement.style.animation = "shrinkResults .3s forwards"
      setTimeout(() => {
        this.filtersDiv.nativeElement.style.display = 'flex'
        this.filtersDiv.nativeElement.style.animation = 'slideout .3s forwards'
      }, 100);
    } else {
      this.filtersDiv.nativeElement.style.animation = 'slidein .3s forwards'
      setTimeout(() => {
        this.filtersDiv.nativeElement.style.display = "none"
      }, 350);
    }
    this.filtersCollapsed = !this.filtersCollapsed
  }

  filterHeroes() {
    this.filteredHeroes = []
    for (let key in this.formValues) {
      this.formValues[key] = this.formValues[key].trim()
      if (key === 'Name' && this.formValues[key].length)
        this.filteredHeroes = this.filteredHeroes?.concat(
          this.heroes.filter(hero => hero.name.includes(this.formValues.Name))
        )
      if (key === 'Phone' && this.formValues[key].length)
        this.filteredHeroes = this.filteredHeroes?.concat(
          this.heroes.filter(hero => hero.phone.includes(this.formValues.Phone))
        )
      if (key === 'Email' && this.formValues[key].length)
        this.filteredHeroes = this.filteredHeroes?.concat(
          this.heroes.filter(hero => hero.email.includes(this.formValues.Email))
        )
      if (key === 'Company' && this.formValues[key].length)
        this.filteredHeroes = this.filteredHeroes?.concat(
          this.heroes.filter(hero => hero.company.includes(this.formValues.Company))
        )
      if (key === 'Country' && this.formValues[key].length)
        this.filteredHeroes = this.filteredHeroes?.concat(
          this.heroes.filter(hero => hero.country === this.formValues.Country)
        )
      if (key === 'Date' && this.formValues[key].length)
        this.filteredHeroes = this.filteredHeroes?.concat(
          this.heroes.filter(hero => hero.date === this.formValues.Date)
        )
    }

    for (let key in this.formValues)
      if (this.formValues[key] === '')
        delete this.formValues[key]
    if (!Object.keys(this.formValues).length) this.filteredHeroes = undefined
    this.saveQueryParams()
  }

  saveQueryParams() {
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: this.formValues,
    });
  }

  resetForm() {
    for (let key in this.formValues)
      delete this.formValues[key]
    this.filteredHeroes = undefined
    this._router.navigate([])
  }

}
