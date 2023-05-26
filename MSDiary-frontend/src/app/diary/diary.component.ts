import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { DiaryMovie } from '../movie.module';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})
export class DiaryComponent implements OnInit{

  constructor(private movieService : MovieService){}

  movies! : Array<DiaryMovie>;

  ngOnInit(): void {
    this.movieService.getAllMoviesForDiary("1").subscribe((movies)=>
      {
        this.movies = movies;
      }
    )
  }


  

}
