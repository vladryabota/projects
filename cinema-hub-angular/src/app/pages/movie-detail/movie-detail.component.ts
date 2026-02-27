import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MovieService } from '../../services/movie.service';
import { BASE_URL } from '../../models/movie.model';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-detail.component.html',
})
export class MovieDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  movieService = inject(MovieService);

  // Signals pro reaktivní správu stavu
  movie = signal<any>(null);
  loading = signal<boolean>(false);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading.set(true);
      this.http.get(`${BASE_URL}&i=${id}`).subscribe({
        next: (res) => {
          this.movie.set(res);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Chyba při načítání detailu:', err);
          this.loading.set(false);
        },
      });
    }
  }

  toggleFavorite() {
    const currentMovie = this.movie();
    if (currentMovie) {
      this.movieService.toggleFavorite(currentMovie.imdbID);
    }
  }

  isFavorite(): boolean {
    const currentMovie = this.movie();
    return currentMovie ? this.movieService.favorites().includes(currentMovie.imdbID) : false;
  }
}
