import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { MovieDetails, Review, User } from '../movie.module';
import { MovieService } from '../movie.service';
import { MakeReviewComponent } from '../make-review/make-review.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddToDiaryComponent } from '../add-to-diary/add-to-diary.component';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit{



  movieDetails$: Observable<MovieDetails> | undefined;
  reviews: Array<Review> | undefined;
  user: Array<User> | undefined;
  movieId!: string;

  isLiked : number =0;
  likedTitle : string = "Like";
  isWatched : number =0;
  watchedTitle : string = "Watch";
  numReviewsDisplayed = 3;
  
  isAdded : number = 0;
  addTitle : string = "Add to diary"

  constructor(
    private readonly route: ActivatedRoute,
    private readonly movieService: MovieService,
    private modalService: NgbModal
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
        this.reviews = reviews;
      });
    });
    
    this.setIsLiked();
    this.setIsWatched();
    this.setIsAdded();

  }
  

  openDialogReview(title : string) {
    const modalRef = this.modalService.open(MakeReviewComponent, {centered : true, animation : true});
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.movieId = this.movieId;
  }

  openDialogDiary(title : string) {
    const modalRef = this.modalService.open(AddToDiaryComponent, {centered : true, animation : true});
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.movieId = this.movieId;
  }

  
  showMoreReviews(){
    this.numReviewsDisplayed += 2;
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 40);
  }

  setIsAdded(){
    this.movieService.getIsAdded("1", this.movieId).subscribe((isAdded) =>{
      this.isAdded = isAdded;
      if (this.isAdded > 0){
        this.addTitle = "Added to diary"
      }
    }
    )
  }


  setIsLiked(){
    this.movieService.getIsLiked("1", this.movieId).subscribe((like) => 
    {
      this.isLiked = like.liked;
      if (like.liked == 0){
        this.likedTitle = "Like";
      }
      else{
        this.likedTitle = "Liked";
      }
    })
  }

  toggleLike() {
    this.movieService.updateLike("1", this.movieId).subscribe();
    this.setIsLiked()
  }

  setIsWatched(){
    this.movieService.getIsWatched("1", this.movieId).subscribe((watch) => 
    {
      this.isWatched = watch.watched;
      if (watch.watched == 0){
        this.watchedTitle = "Watch";
      }
      else{
        this.watchedTitle = "Watched";
      }
    })
  }

  toggleWatch() {
    this.movieService.updateWatch("1", this.movieId).subscribe();
    this.setIsWatched()
  }
}
