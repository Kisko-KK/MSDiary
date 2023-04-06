import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { map, Observable } from 'rxjs';
import { Movie, Review, User } from './movie.module';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private readonly API_KEY = '6ecce39b80b6ac040387e5ec54b40565'

  constructor(private http: HttpClient) { }


  searchMovie(searchQuery: string): Observable<Array<Movie>>{
    
    return this.http.get(`https://api.themoviedb.org/3/search/movie?api_key=${this.API_KEY}&query=${searchQuery}`)
    .pipe(
      map((response: any) => response.results)
    );
    
  }
  getMovieDetails(imdbId: number): Observable<any> {
    return this.http.get<any>(`https://api.themoviedb.org/3/movie/${imdbId}?api_key=${this.API_KEY}&language=en-US`);
  }
  getPopularMovies() : Observable<Array<Movie>>{
    return this.http.get(`https://api.themoviedb.org/3/movie/popular?api_key=${this.API_KEY}`)
    .pipe(
      map((response: any) => response.results)
    );
  }
  getNowPlayingMovies() : Observable<Array<Movie>>{
    return this.http.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${this.API_KEY}`)
    .pipe(
      map((response: any) => response.results)
    );
  }
  getUpcomingMovies() : Observable<Array<Movie>>{
    return this.http.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${this.API_KEY}`)
    .pipe(
      map((response: any) => response.results)
    );
  }
  getTopRatedMovies() : Observable<Array<Movie>>{
    return this.http.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${this.API_KEY}`)
    .pipe(
      map((response: any) => response.results)
    );
  }




  getAllReviewsForMovie(movieId : string) : Observable<Array<Review>>{
    return this.http.get<Array<Review>>(`http://localhost:8000/api/movie/reviews/${movieId}`);
  }

  getUserNameById(userId : string) : Observable<Array<User>>{
    return this.http.get<Array<User>>(`http://localhost:8000/api/users/${userId}`);
  }



}
