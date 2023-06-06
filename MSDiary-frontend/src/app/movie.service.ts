import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { map, Observable } from 'rxjs';
import { DiaryMovie, Like, Movie, Review, User, Watch } from './movie.module';
import { AngularFireAuth } from '@angular/fire/compat/auth'

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type' : 'application/json', 
  })
};

const httpOptionsWithAuthToken = (token: any) => ({
  headers : new HttpHeaders({
    'Content-Type' : 'application/json', 
    'AuthToken' : token,
  })
});



@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private readonly API_KEY = '6ecce39b80b6ac040387e5ec54b40565'

  constructor(
    private http: HttpClient,
    private auth: AngularFireAuth,
    ) { }


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



  getUserNameById(userId : string) : Observable<string>{
    return this.http.get<string>(`http://localhost:8000/api/users/${userId}`);
  }



  createNewReview(movieId : string, description : string, score : number) : Observable<Review>{

    return new Observable<Review>(observer => {
      this.auth.user.subscribe(user => {
        user && user.getIdToken().then(token => {
          this.http.post<Review>('http://localhost:8000/api/movie/reviews',
            {movieId, description, score}, httpOptionsWithAuthToken(token),)
          .subscribe(() => {observer.next();
          });
        })
      })
    })
  }


  getIsLiked(movieId : string) : Observable<Like>{

    return new Observable<Like>(observer => {
      this.auth.user.subscribe(user => {
        user && user.getIdToken().then(token => {
          if(user && token){
            this.http.get<Like>(`http://localhost:8000/api/movie/likes/${movieId}/${user.uid}`, httpOptionsWithAuthToken(token))
            .subscribe( res => {
              observer.next(res);
            });
          } else{
            observer.next();
          }
        })
      })
    })
  }


  updateLike(movieId : string) : Observable<any>{

    return new Observable<any>(observer => {
      this.auth.user.subscribe(user => {
        user && user.getIdToken().then(token => {
          this.http.post<Review>(
            'http://localhost:8000/api/movie/likes/update',
            { movieId},
          httpOptionsWithAuthToken(token),)
          .subscribe(() => {observer.next();
          });
        })
      })
    })
  }


  getIsWatched( movieId : string) : Observable<Watch>{

    return new Observable<Watch>(observer => {
      this.auth.user.subscribe(user => {
        user && user.getIdToken().then(token => {
          if(user && token){
            this.http.get<Watch>(`http://localhost:8000/api/movie/watches/${movieId}/${user.uid}`, httpOptionsWithAuthToken(token))
            .subscribe( res => {
              observer.next(res);
            });
          } else{
            observer.next();
          }
        })
      })
    })
  }


  updateWatch( movieId : string) : Observable<any>{

    return new Observable<any>(observer => {
      this.auth.user.subscribe(user => {
        user && user.getIdToken().then(token => {
          this.http.post<Review>(
            'http://localhost:8000/api/movie/watches/update',
            {movieId},
          httpOptionsWithAuthToken(token),)
          .subscribe(() => {observer.next();
          });
        })
      })
    })

    
  }


  getIsAdded(movieId : string) : Observable<number>{

    return new Observable<number>(observer => {
      this.auth.user.subscribe(user => {
        user && user.getIdToken().then(token => {
          if(user && token){
            this.http.get<number>(`http://localhost:8000/api/diary/${movieId}/${user.uid}`, httpOptionsWithAuthToken(token))
            .subscribe( res => {
              observer.next(res);
            });
          } else{
            observer.next();
          }
        })
      })
    })

  }



  addNewMovieToDiary(movieId : string, description : string, score : number, watchAgain: number) : Observable<any>{

    return new Observable<any>(observer => {
      this.auth.user.subscribe(user => {
        user && user.getIdToken().then(token => {
          this.http.post<any>(`http://localhost:8000/api/diary`, 
          {movieId, description, score, watchAgain},
          httpOptionsWithAuthToken(token),)
          .subscribe(() => {observer.next();
          });
        })
      })
    })


  }


  getAllMoviesForDiary() : Observable<Array<DiaryMovie>>{

    return new Observable<Array<DiaryMovie>>(observer => {
      this.auth.user.subscribe(user => {
        user && user.getIdToken().then(token => {
          if(user && token){
            this.http.get<Array<DiaryMovie>>(`http://localhost:8000/api/diary/${user.uid}`, httpOptionsWithAuthToken(token))
            .subscribe( movies => {
              observer.next(movies);
            });
          } else{
            observer.next([]);
          }
        })
      })
    })

  }


  deleteDiaryMovie(movieId:string) : Observable<any>{
    return new Observable<any>(observer => {
      this.auth.user.subscribe(user => {
        user && user.getIdToken().then(token => {
          this.http.delete(`http://localhost:8000/api/diary/${movieId}`, httpOptionsWithAuthToken(token))
          .subscribe(() => {observer.next();
          });
        })
      })
    })
  }


}
