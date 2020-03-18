import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { BookComponent } from './pages/book/book.component';


const routes: Routes = [
  {path: 'Login', component: LoginComponent},
  {path: 'Home', component: HomeComponent},
  {path: 'Book/:id', component: BookComponent},
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'Home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
