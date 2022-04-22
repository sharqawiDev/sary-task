import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('filters') filters!: ElementRef
  @ViewChild('results') results!: ElementRef
  public filtersCollapsed: boolean = false
  public email: string = ''
  constructor() { }

  triggerCollapse() {
    if (this.filtersCollapsed) {
      this.results.nativeElement.style.animation = "shrinkResults .3s forwards"
      setTimeout(() => {
        this.filters.nativeElement.style.display = 'flex'
        this.filters.nativeElement.style.animation = 'slideout .3s forwards'
      }, 100);
    } else {
      this.filters.nativeElement.style.animation = 'slidein .3s forwards'
      setTimeout(() => {
        this.filters.nativeElement.style.display = "none"
      }, 350);
    }
    this.filtersCollapsed = !this.filtersCollapsed
  }

  ngOnInit(): void {
  }

}
