import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SplashComponent } from './pages/splash/splash.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { FilterConfigService } from './services/filter-config.service';
import { CommonModule } from '@angular/common';
import { CountriesListService } from './services/countries-list.service';
import { HeroesListService } from './services/heroes-list.service';
import { MatTableModule } from '@angular/material/table';


export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SplashComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatDialogModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatIconModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  providers: [FilterConfigService, CountriesListService, HeroesListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
