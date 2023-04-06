import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { MovieDetails, Review } from '../movie.module';
import { MovieService } from '../movie.service';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit{
  movieDetails$: Observable<MovieDetails> | undefined;
  reviews$: Array<Review> | undefined;
  movieId!: string;
  
  
  constructor(
    private readonly route: ActivatedRoute,
    private readonly movieService: MovieService
  ) {}

  ngOnInit() {
    this.movieDetails$ = this.route.queryParams.pipe(
      map(queryParams => queryParams["movieId"]),
      switchMap(imdbId => this.movieService.getMovieDetails(imdbId)
      )
    );
    this.movieDetails$.subscribe((res) => res.poster_path = 'https://image.tmdb.org/t/p/original' + res.poster_path );

      
    this.route.queryParams.subscribe(params => {
      this.movieId = params['movieId'];
      this.movieService.getAllReviewsForMovie(this.movieId).subscribe(reviews => {
        this.reviews$ = reviews;
      });
    });
    
  }
  }


