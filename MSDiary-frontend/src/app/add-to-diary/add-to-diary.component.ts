import {  Component, Input, } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MovieService } from '../movie.service';


@Component({
  selector: 'app-add-to-diary',
  templateUrl: './add-to-diary.component.html',
  styleUrls: ['./add-to-diary.component.css']
})
export class AddToDiaryComponent {


  constructor(
    public activeModal: NgbActiveModal,
    private readonly movieService: MovieService,
    ) {
    
  }

  @Input()
  title! : string;
  @Input()
  movieId! : string;


  score: number = 1;
  


  epform = new FormGroup({
    description : new FormControl(),
    watchAgain : new FormControl(),
    score: new FormControl(1),
  })


  close() {
    this.activeModal.close();
  }

  addToDiary() {

    let description = this.epform.value.description;
    let score = this.epform.value.score;
    let watchAgain = this.epform.value.watchAgain;

    if (watchAgain){
      watchAgain = 1;
    }
    else{
      watchAgain = 0;
    }

    console.log(description, score, watchAgain);
    
    if (score !== undefined && score !== null){
      this.movieService.addNewMovieToDiary(this.movieId, description, score, "1", watchAgain).subscribe();
      this.close();
      location.reload();
    }
  }
}
