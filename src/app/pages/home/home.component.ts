import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public books: Array<Book>;

  constructor(private http:BookService) { }

  ngOnInit(): void {
    this.http.getBooks().subscribe((books: Book[]) => {
      this.books = books;
    });
  }

}
