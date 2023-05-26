import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { DiaryComponent } from './diary/diary.component';

const routes: Routes = [
  {path: "" , component: HomeComponent},
  {path: "movie-details", component : MovieDetailsComponent},
  {path: "diary", component : DiaryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
