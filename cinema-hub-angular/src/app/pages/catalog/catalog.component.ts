import { Component, OnInit, inject, signal } from '@angular/core'; // SPRÁVNĚ: Z @angular/core
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule, MovieCardComponent],
  templateUrl: './catalog.component.html',
})
export class CatalogComponent implements OnInit {
  private http = inject(HttpClient);
  movieService = inject(MovieService);

  // Signals pro reaktivní změnu UI
  movies = signal<any[]>([]);
  query = 'Marvel';
  type = '';
  page = 1;
  totalResults = 0;
  totalPages = 1;
  loading = signal<boolean>(false);

  filters = [
    { label: 'All', value: '' },
    { label: 'Movies', value: 'movie' },
    { label: 'Series', value: 'series' },
  ];

  setType(val: string) {
    this.type = val;
    this.page = 1;
    this.fetchMovies();
  }

  changePage(delta: number) {
    this.page += delta;
    this.fetchMovies();
  }

  ngOnInit() {
    this.fetchMovies();
  }

  fetchMovies() {
    this.loading.set(true);

    const url = `https://www.omdbapi.com/?apikey=3f95d70a&s=${encodeURIComponent(this.query)}&page=${this.page}${this.type ? '&type=' + this.type : ''}`;

    this.http.get<any>(url).subscribe({
      next: (data) => {
        if (data.Response === 'True' && data.Search) {
          this.movies.set(data.Search);
          this.totalResults = parseInt(data.totalResults, 10);
          this.totalPages = Math.ceil(this.totalResults / 10);
        }
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Prod error:', err);
        this.loading.set(false);
      },
    });
  }
}
