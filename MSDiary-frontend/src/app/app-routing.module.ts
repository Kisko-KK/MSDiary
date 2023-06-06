import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { DiaryComponent } from './diary/diary.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: "" , component: LoginComponent},
  {path: "movie-details", component : MovieDetailsComponent},
  {path: "diary", component : DiaryComponent},
  {path: "home", component : HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
