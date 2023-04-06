import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../movie.module';

@Component({
  selector: 'app-movies-row',
  templateUrl: './movies-row.component.html',
  styleUrls: ['./movies-row.component.css']
})
export class MoviesRowComponent{

  @Input()
  movies!: Array<Movie> | null;

  @Input()
  title!: string;
  
  
  @Input()
  isSecond!: Boolean;

  

  



}
