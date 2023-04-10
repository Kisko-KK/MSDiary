import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-make-review',
  templateUrl: './make-review.component.html',
  styleUrls: ['./make-review.component.css']
})

export class MakeReviewComponent {

  @Input()
  title! : string;
  @Input()
  movieId! : string;

  constructor(
    public activeModal: NgbActiveModal,
    private readonly movieService: MovieService
    ) {
    
  }

  

  rating: number = 0;

  epform = new FormGroup({
    description : new FormControl(),
  })
  

  rate(value: number) {
    this.rating = value;
  }

  close() {
    this.activeModal.close();
  }

  review(){
    let description = this.epform.value.description;
    this.movieService.createNewReview(this.movieId, description, this.rating)
      .subscribe();
    
    this.close();
    location.reload();
  }
}
