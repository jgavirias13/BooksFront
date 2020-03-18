import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models/book.model';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  error: string;
  public book: Book ={
    _id: '',
    nombre: '',
    descripcion: '',
    autor: '',
    imagen: '',
    categorias: []
  }

  constructor(private activatedRoute: ActivatedRoute, private http:BookService, private location:Location, private auth:AuthService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameters) => {
      const id: string = parameters.id;
      this.http.getBook(id).subscribe((book) => {
        this.book = book;
      })
    })
  }

  goBack(): void{
    this.location.back();
  }

  loggedIn(){
    return this.auth.loggedIn;
  }

  delete(): void{
    this.http.deleteBook(this.book._id).subscribe((book) => {
      this.router.navigate(['Home']);
    }, err => {
      if (err.error) {
        this.error = err.error.message || 'Ha ocurrido un error al procesar su solicitud'
      } else {
        this.error = 'Ha ocurrido un error al procesar su solicitud'
      }
    })
  }
}
