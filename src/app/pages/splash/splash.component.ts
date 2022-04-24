import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnDestroy {
  private _timer: any = null
  options: AnimationOptions = {
    path: '../../assets/loading.json',
  };

  constructor(
    private _router: Router
  ) { }

  animationCreated(animationItem: AnimationItem): void {
    this._timer = setTimeout(() => {
      this._router.navigate(['dashboard'])
    }, 3000);
  }

  ngOnDestroy(): void {
    clearTimeout(this._timer)
  }

}
