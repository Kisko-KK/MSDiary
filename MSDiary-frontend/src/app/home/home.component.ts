import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie, MovieDetails } from '../movie.module';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  movies$! : Observable<Array<Movie>>;
  query! : string;

  details$! : Observable<MovieDetails>;
  popularMovies$! : Observable<Array<Movie>>;
  upcomingMovies$! : Observable<Array<Movie>>;
  nowPlayingMovies$! : Observable<Array<Movie>>;
  topRatedMovies$! : Observable<Array<Movie>>;

  isSearched! : Boolean;

  constructor(private readonly movieService: MovieService){}
  ngOnInit(): void {
    this.isSearched = false;
    this.getPopularMovies();
    this.getNowPlayingMovies();
    this.getUpcomingMovies();
    this.getTopRatedMovies();
  }

  id : number = 646389;

  getSearchResults(){

    this.movies$ = this.movieService.searchMovie(this.query);
    this.isSearched = true;
  }

  getPopularMovies(){
    this.popularMovies$ = this.movieService.getPopularMovies();
    this.popularMovies$.subscribe((res) => console.log(res));
  }
  getNowPlayingMovies(){
    this.nowPlayingMovies$ = this.movieService.getNowPlayingMovies();
    this.nowPlayingMovies$.subscribe((res) => console.log(res));
  }
  getUpcomingMovies(){
    this.upcomingMovies$ = this.movieService.getUpcomingMovies();
    this.upcomingMovies$.subscribe((res) => console.log(res));
  }
  getTopRatedMovies(){
    this.topRatedMovies$ = this.movieService.getUpcomingMovies();
    this.topRatedMovies$.subscribe((res) => console.log(res));
  }

}


