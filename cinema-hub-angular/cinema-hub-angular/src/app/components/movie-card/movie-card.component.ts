import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-card.component.html',
})
export class MovieCardComponent {
  @Input({ required: true }) movie: any;
  @Input() isFavorite: boolean = false;
  @Output() toggle = new EventEmitter<string>();
}
