import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { map, Observable } from 'rxjs';
import { DiaryMovie, Like, Movie, Review, User, Watch } from './movie.module';


const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type' : 'application/json', 
  })
}

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

  createNewReview(movieId : string, description : string, score : number) : Observable<Review>{
    return this.http.post<Review>(
      'http://localhost:8000/api/movie/reviews',
      {movieId, description, score},
      httpOptions
    )
  }

  getIsLiked(userId : string, movieId : string) : Observable<Like>{
    return this.http.get<Like>(`http://localhost:8000/api/movie/likes/${movieId}/${userId}`);
  }

  updateLike(userId : string, movieId : string) : Observable<any>{
    return this.http.post<Review>(
      'http://localhost:8000/api/movie/likes/update',
      {userId, movieId},
      httpOptions
    )
  }

  getIsWatched(userId : string, movieId : string) : Observable<Watch>{
    return this.http.get<Watch>(`http://localhost:8000/api/movie/watches/${movieId}/${userId}`);
  }

  updateWatch(userId : string, movieId : string) : Observable<any>{
    return this.http.post<Review>(
      'http://localhost:8000/api/movie/watches/update',
      {userId, movieId},
      httpOptions
    )
  }

  getIsAdded(userId : string, movieId : string) : Observable<number>{
    return this.http.get<number>(`http://localhost:8000/api/diary/${movieId}/${userId}`);
  }


  addNewMovieToDiary(movieId : string, description : string, score : number, userId: string, watchAgain: number) : Observable<any>{
    return this.http.post<any>(
      'http://localhost:8000/api/diary',
      {movieId, userId, description, score, watchAgain},
      httpOptions
    )
  }

  getAllMoviesForDiary(userId : string) : Observable<Array<DiaryMovie>>{
    return this.http.get<Array<DiaryMovie>>(`http://localhost:8000/api/diary/${userId}`);
  }

  deleteDiaryMovie(movieId:string, userId:string) : Observable<any>{
    return this.http.delete<any>(`http://localhost:8000/api/diary/${movieId}/${userId}`);
  }


}
