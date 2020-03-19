import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import * as jwdDecode from 'jwt-decode';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userForm;
  userId: string;

  error = '';
  mensaje = '';

  constructor(private location:Location, private formBuilder: FormBuilder, private auth:AuthService, private router:Router, private http:UserService) {
    this.userForm = this.formBuilder.group({
      name: '',
      username: '',
      password: ''
    });
  }

  ngOnInit(): void {
    if (!this.auth.loggedIn) {
      this.router.navigate(['Home']);
    }
    const token = this.auth.getToken();
    this.userId = jwdDecode(token).user;
    
    this.http.getUser(this.userId).subscribe((user) => {
      this.userForm = this.formBuilder.group({
        name: user.name,
        username: user.username,
        password: ''
      });
    })
  }

  goBack(): void{
    this.location.back();
  }

  onSubmit(user){
    if(user.password == ''){
      delete user.password;
    }
    this.http.updateUser(this.userId, user).subscribe((user) => {
      this.mensaje = 'Usuario editado con exito';
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
