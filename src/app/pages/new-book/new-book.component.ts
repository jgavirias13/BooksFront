import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';
import {ENTER, COMMA} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {
  newBookForm;
  error: string;
  mensaje: string;

  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];

  constructor(private formBuilder: FormBuilder, private http: BookService, private auth: AuthService, private router: Router) {
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
  }

  onSubmit(bookData) {
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
