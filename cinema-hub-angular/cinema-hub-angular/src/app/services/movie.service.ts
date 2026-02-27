import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MovieService {
  favorites = signal<string[]>(JSON.parse(localStorage.getItem('cinema-favorites') || '[]'));

  toggleFavorite(id: string) {
    const current = this.favorites();
    const updated = current.includes(id) ? current.filter((f) => f !== id) : [...current, id];

    this.favorites.set(updated);
    localStorage.setItem('cinema-favorites', JSON.stringify(updated));
  }

  isFavorite(id: string): boolean {
    return this.favorites().includes(id);
  }
}
