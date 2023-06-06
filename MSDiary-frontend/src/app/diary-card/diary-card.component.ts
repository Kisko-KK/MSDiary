import { Component, Input, OnInit } from '@angular/core';
import { DiaryMovie, Movie, MovieDetails } from '../movie.module';
import { MovieService } from '../movie.service';
import { Observable } from 'rxjs';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-diary-card',
  templateUrl: './diary-card.component.html',
  styleUrls: ['./diary-card.component.css']
})
export class DiaryCardComponent implements OnInit{

  @Input()
  movie! : DiaryMovie;
  @Input()
  index! : number;
  movieDetails!: MovieDetails;

  constructor(private movieService : MovieService,
              private router : Router,        
      ){}

  ngOnInit(): void {
    this.movieService.getMovieDetails(this.movie.movie_id).subscribe((movieDetails)=>{
      this.movieDetails = movieDetails;
    })
  }

  
  deleteDiaryMovie( movieId: string){
    this.movieService.deleteDiaryMovie(movieId).subscribe();
    location.reload();
  }
 
  goToMovieDetails(movieId: string) {
    this.router.navigate(['/movie-details'], { queryParams: { movieId: movieId } });
}


}
