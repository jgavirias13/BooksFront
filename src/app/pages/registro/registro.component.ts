import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public name: string;
  public username: string;
  public password: string;
  public error: string;

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
    if(this.auth.loggedIn){
      this.router.navigate(['Home']);
    }
  }

  public submit() {
    let user = {name: this.name, username: this.username, password: this.password};
    this.auth.register(user)
      .subscribe(
        result => this.router.navigate(['Login']),
        err => {
          if(err.error){
            this.error = err.error.message || 'No se pudo crear el usuario';
          }else{
            this.error = 'No se pudo crear el usuario';
          }
        }
      );
  }
}
