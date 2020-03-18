import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {
  newBookForm;
  error: string;
  mensaje: string;

  titulo: string = 'Nuevo Libro';
  book: Book;

  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];

  constructor(private formBuilder: FormBuilder, private http: BookService, private auth: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.newBookForm = this.formBuilder.group({
      nombre: '',
      descripcion: '',
      autor: '',
      imagen: '',
      categorias: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    if (!this.auth.loggedIn) {
      this.router.navigate(['Home']);
    }
    this.activatedRoute.params.subscribe((parameters) => {
      const id: string = parameters.id;
      this.http.getBook(id).subscribe((book) => {
        this.titulo = 'Editar libro'
        this.book = book;
        this.newBookForm = this.formBuilder.group({
          nombre: book.nombre,
          descripcion: book.descripcion,
          autor: book.autor,
          imagen: book.imagen,
          categorias: this.formBuilder.array(book.categorias)
        });
      })
    })
  }

  onSubmit(bookData) {
    if(!this.book){
      this.http.addBook(bookData).subscribe((book) => {
        this.mensaje = 'Libro creado con exito';
        this.error = '';
        this.newBookForm.reset();
      }, err => {
        this.mensaje = '';
        if (err.error) {
          this.error = err.error.message || 'Ha ocurrido un error al procesar su solicitud'
        } else {
          this.error = 'Ha ocurrido un error al procesar su solicitud'
        }
      });
    }else{
      this.http.editBook(bookData, this.book._id).subscribe((book) => {
        this.mensaje = 'Libro editado con exito';
        this.error = '';
      }, err => {
        this.mensaje = '';
        if (err.error) {
          this.error = err.error.message || 'Ha ocurrido un error al procesar su solicitud'
        } else {
          this.error = 'Ha ocurrido un error al procesar su solicitud'
        }
      });
    }
  }

  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our requirement
    if ((value || '').trim()) {
      const categorias = this.newBookForm.get('categorias') as FormArray;
      categorias.push(this.formBuilder.control(value.trim()));
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(index: number): void {
    const categorias = this.newBookForm.get('categorias') as FormArray;

    if (index >= 0) {
      categorias.removeAt(index);
    }
  }

}
