import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { MovieDetails, Review, User } from '../movie.module';
import { MovieService } from '../movie.service';
import { MakeReviewComponent } from '../make-review/make-review.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


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

  numReviewsDisplayed = 3;
  
  
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
    
  }

  openDialog(title : string) {
    const modalRef = this.modalService.open(MakeReviewComponent, {centered : true, animation : true});
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.movieId = this.movieId;
  }

  showMoreReviews(){
    this.numReviewsDisplayed += 2;
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 40);
  }

}
