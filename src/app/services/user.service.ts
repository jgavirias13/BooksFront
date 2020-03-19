import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book.model';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.baseAPIUrl;

  constructor(private readonly http:HttpClient) { }

  public getUser(id: string){
    return this.http.get<User>(`${this.baseUrl}/user/${id}`);
  }

  public updateUser(id: string, userData){
    return this.http.patch<User>(`${this.baseUrl}/user/${id}`, userData);
  }
}
