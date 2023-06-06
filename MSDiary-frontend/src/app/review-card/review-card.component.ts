import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Review, User } from '../movie.module';
import { MovieService } from '../movie.service';


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

  username! : String;

  ngOnInit(): void {
    this.movieService.getUserNameById(this.review.user_id).subscribe((response) => {
      let usernameObject: any;
    
      if (typeof response === 'object') {
        usernameObject = response;
      } else if (typeof response === 'string') {
        usernameObject = JSON.parse(response);
      }
      
      this.username = usernameObject?.username || '';
      console.log(this.username);
    });
  }
  

}
