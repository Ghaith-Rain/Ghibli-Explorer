import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GhibliApiService } from '../../services/ghibli-api.service';
import { Film } from '../../models/film.model';
import { FilmCardComponent } from '../film-card/film-card.component';

@Component({
  selector: 'app-film-list',
  standalone: true,
  imports: [CommonModule, FilmCardComponent],
  templateUrl: './film-list.component.html',
  styleUrl: './film-list.component.css'
})
export class FilmListComponent implements OnInit {
  films = signal<Film[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(private ghibliApi: GhibliApiService) {}

  ngOnInit(): void {
    this.loadFilms();
  }

  loadFilms(): void {
    this.loading.set(true);
    this.error.set(null);

    this.ghibliApi.getFilms().subscribe({
      next: (films) => {
        this.films.set(films);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load films. Please try again later.');
        this.loading.set(false);
        console.error('Error loading films:', err);
      }
    });
  }
}
