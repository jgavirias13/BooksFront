import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query: string;

  constructor(private activatedRoute: ActivatedRoute, private http:BookService) { }

  public books: Array<Book>;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameters)  => {
      this.query = parameters.query;
      
      this.http.searchBooks(this.query).subscribe((books) => {
        this.books = books;
      })
    });
  }

}
