import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService) {  }

  ngOnInit(): void {
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
