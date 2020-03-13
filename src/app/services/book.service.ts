import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Book } from '../models/book.model';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = environment.baseAPIUrl;

  constructor(private readonly http:HttpClient) { }

  public getBooks(){
    return this.http.get<Book[]>(`${this.baseUrl}/libro`);
  }
}
