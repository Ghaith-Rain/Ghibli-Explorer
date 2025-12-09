import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Film } from '../../models/film.model';
import { TruncateTextPipe } from '../../pipes/truncate-text.pipe';
import { HoverFloatDirective } from '../../directives/hover-float.directive';
import { UiStateService } from '../../services/ui-state.service';

@Component({
  selector: 'app-film-card',
  standalone: true,
  imports: [CommonModule, RouterLink, TruncateTextPipe, HoverFloatDirective],
  templateUrl: './film-card.component.html',
  styleUrl: './film-card.component.css'
})
export class FilmCardComponent {
  @Input({ required: true }) film!: Film;

  constructor(private uiState: UiStateService) {}

  isFavorite(): boolean {
    return this.uiState.isFavorite(this.film.id);
  }

  toggleFavorite(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.uiState.toggleFavorite(this.film.id);
  }
}
