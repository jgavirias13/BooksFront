import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  public book: Book ={
    _id: '',
    nombre: '',
    descripcion: '',
    autor: '',
    imagen: '',
    categorias: []
  }

  constructor(private activatedRoute: ActivatedRoute, private http:BookService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameters) => {
      const id: string = parameters.id;
      this.http.getBook(id).subscribe((book) => {
        this.book = book;
      })
    })
  }

}
