import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Review, User } from '../movie.module';
import { MovieService } from '../movie.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.css']
})
export class ReviewCardComponent implements OnInit{

  constructor(
    private readonly movieService: MovieService
  ) {}

  @Input()
  review!: Review;

  user! : Array<User>;

  

  ngOnInit(): void {
    this.movieService.getUserNameById(this.review.user_id)
      .subscribe((user) => {this.user = user;})
  }
  
  
  

  

}
