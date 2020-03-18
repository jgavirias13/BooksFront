import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {
  newBookForm;
  error: string;
  mensaje: string;

  constructor(private formBuilder: FormBuilder, private http: BookService, private auth:AuthService, private router:Router) {
    this.newBookForm = this.formBuilder.group({
      nombre: '',
      descripcion: '',
      autor: '',
      imagen: ''
    });
  }

  ngOnInit(): void {
    if(!this.auth.loggedIn){
      this.router.navigate(['Home']);
    }
  }

  onSubmit(bookData) {
    this.http.addBook(bookData).subscribe((book) => {
      this.mensaje = 'Libro creado con exito';
      this.error = '';
      this.newBookForm.reset();
    }, err => {
      this.mensaje = '';
      if(err.error){
        this.error = err.error.message || 'Ha ocurrido un error al procesar su solicitud'
      }else{
        this.error = 'Ha ocurrido un error al procesar su solicitud'
      }
    });
  }

}
