import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Book } from 'src/app/models/book.model';
import * as jwdDecode from 'jwt-decode';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  books: Array<Book>;
  private userId: string;

  constructor(private auth:AuthService, private router:Router, private http:UserService) { }

  ngOnInit(): void {
    if (!this.auth.loggedIn) {
      this.router.navigate(['Home']);
    }

    let token = jwdDecode(this.auth.getToken());
    this.userId = token.user;

    this.http.getUser(this.userId).subscribe((user) => {
      this.books = user.favoritos;
    })
  }

}
