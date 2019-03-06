import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MatTableModule, MatSelectModule, MatFormFieldModule, MatSortModule, MatPaginatorModule } from '@angular/material'; 
import { HttpClientModule } from '@angular/common/http'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home', 
    pathMatch: 'full'
  },
  {
    path: 'index.html',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home', 
    component: HomeComponent
  },
  {
    path: 'details/:id/:name', 
    component: DetailsComponent, 
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatSelectModule, 
    MatFormFieldModule, 
    MatTableModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatPaginatorModule,
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
