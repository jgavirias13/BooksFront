import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import * as jwdDecode from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username = '';
  constructor(private router: Router, private auth: AuthService) {  }

  ngOnInit(): void {
    let user = jwdDecode(this.auth.getToken());
    this.username = user.username;
  }

  searchBook(query: string){
    this.router.navigate(['/Search', query]);
  }

  logout(){
    this.auth.logout();
  }

  loggedIn(){
    return this.auth.loggedIn;
  }
}
