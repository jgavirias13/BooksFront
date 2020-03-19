import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-fav-button',
  templateUrl: './fav-button.component.html',
  styleUrls: ['./fav-button.component.css']
})
export class FavButtonComponent implements OnInit {

  isSubmitting = false;

  icon = 'favorite_border';

  @Input() book;
  constructor(private http:BookService, private auth:AuthService) {  }

  ngOnInit(): void {
  }

  toggleFavorite(){
    this.isSubmitting = true;
    if(this.auth.loggedIn){
      if(!this.book.isFavorite){
        return this.http.addToFavorites(this.book._id).subscribe((user) => {
          this.isSubmitting = false;
          this.book.isFavorite = true;
        }, err => {
          this.isSubmitting = false;
        })
      }else{
        return this.http.removeFromFavorites(this.book._id).subscribe((user) => {
          this.isSubmitting = false;
          this.book.isFavorite = false;
        }, err => {
          this.isSubmitting = false;
        })
      }
    }
  }

  isLogged(){
    return this.auth.loggedIn;
  }
}
