import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../movie.module';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit{
  ngOnInit(): void {
    
    this.movie.poster_path = 'https://image.tmdb.org/t/p/original' + this.movie.poster_path 
    
  }
  @Input()
  movie!: Movie;




}
