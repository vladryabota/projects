import { Component, inject, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieService } from '../../services/movie.service';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { BASE_URL } from '../../models/movie.model';
import { forkJoin } from 'rxjs';

@Component({
  standalone: true,
  imports: [MovieCardComponent],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  movieService = inject(MovieService);
  private http = inject(HttpClient);
  favoriteMovies = signal<any[]>([]);

  constructor() {
    // Sledujeme změny ve favorites a fetchujeme data
    effect(
      () => {
        const ids = this.movieService.favorites();
        if (ids.length > 0) {
          const requests = ids.map((id) => this.http.get(`${BASE_URL}&i=${id}`));
          forkJoin(requests).subscribe((results) => this.favoriteMovies.set(results));
        } else {
          this.favoriteMovies.set([]);
        }
      },
      { allowSignalWrites: true },
    );
  }
}
