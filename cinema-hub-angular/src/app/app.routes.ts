import { Routes } from '@angular/router';
import { CatalogComponent } from './pages/catalog/catalog.component';

export const routes: Routes = [
  { path: '', component: CatalogComponent },
  {
    path: 'movie/:id',
    loadComponent: () =>
      import('./pages/movie-detail/movie-detail.component').then((m) => m.MovieDetailComponent),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.component').then((m) => m.ProfileComponent),
  },
];
