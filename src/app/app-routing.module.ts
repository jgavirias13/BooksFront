import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { BookComponent } from './pages/book/book.component';
import { SearchComponent } from './pages/search/search.component';
import { NewBookComponent } from './pages/new-book/new-book.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegistroComponent } from './pages/registro/registro.component';


const routes: Routes = [
  {path: 'Login', component: LoginComponent},
  {path: 'Home', component: HomeComponent},
  {path: 'Book/:id', component: BookComponent},
  {path: 'NewBook', component: NewBookComponent},
  {path: 'EditBook/:id', component: NewBookComponent},
  {path: 'Search/:query', component: SearchComponent},
  {path: 'Favorites', component: FavoritesComponent},
  {path: 'Profile', component: ProfileComponent},
  {path: 'Register', component: RegistroComponent},
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
