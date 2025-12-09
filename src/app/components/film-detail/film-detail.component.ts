import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { GhibliApiService } from '../../services/ghibli-api.service';
import { UiStateService, FilmNote, FilmReview } from '../../services/ui-state.service';
import { Film } from '../../models/film.model';

@Component({
  selector: 'app-film-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './film-detail.component.html',
  styleUrl: './film-detail.component.css'
})
export class FilmDetailComponent implements OnInit {
  film = signal<Film | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  filmNotes = signal<FilmNote[]>([]);
  filmReviews = signal<FilmReview[]>([]);
  noteForm: FormGroup;
  reviewForm: FormGroup;
  today: string;

  constructor(
    private route: ActivatedRoute,
    private ghibliApi: GhibliApiService,
    private uiState: UiStateService,
    private fb: FormBuilder
  ) {
    // Set today's date for date picker max value
    this.today = new Date().toISOString().split('T')[0];
    
    this.noteForm = this.fb.group({
      note: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.reviewForm = this.fb.group({
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      reviewText: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]],
      isSpoiler: [false],
      mood: ['', Validators.required],
      dateWatched: [null]
    }, { validators: this.spoilerValidator });
  }

  /**
   * Custom validator: If spoiler is checked, review must contain "spoiler" warning
   */
  private spoilerValidator(control: AbstractControl): ValidationErrors | null {
    const isSpoiler = control.get('isSpoiler')?.value;
    const reviewText = control.get('reviewText')?.value?.toLowerCase() || '';
    
    if (isSpoiler && !reviewText.includes('spoiler')) {
      control.get('reviewText')?.setErrors({ 
        ...control.get('reviewText')?.errors,
        spoilerWarning: true 
      });
      return { spoilerWarning: true };
    }
    
    // Remove spoiler error if condition is met
    if (!isSpoiler || reviewText.includes('spoiler')) {
      const errors = control.get('reviewText')?.errors;
      if (errors && errors['spoilerWarning']) {
        delete errors['spoilerWarning'];
        control.get('reviewText')?.setErrors(Object.keys(errors).length > 0 ? errors : null);
      }
    }
    
    return null;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadFilm(id);
      this.loadNotes(id);
      this.loadReviews(id);
    }
  }

  loadFilm(id: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.ghibliApi.getFilm(id).subscribe({
      next: (film) => {
        this.film.set(film);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load film details. Please try again later.');
        this.loading.set(false);
        console.error('Error loading film:', err);
      }
    });
  }

  loadNotes(filmId: string): void {
    this.filmNotes.set(this.uiState.getFilmNotes(filmId));
  }

  loadReviews(filmId: string): void {
    this.filmReviews.set(this.uiState.getFilmReviews(filmId));
  }

  setRating(rating: number): void {
    this.reviewForm.patchValue({ rating });
    this.reviewForm.get('rating')?.markAsTouched();
  }

  addNote(): void {
    if (this.noteForm.valid && this.film()) {
      const noteValue = this.noteForm.get('note')?.value;
      this.uiState.addFilmNote(this.film()!.id, noteValue);
      this.noteForm.reset();
      this.loadNotes(this.film()!.id);
    }
  }

  addReview(): void {
    if (this.reviewForm.valid && this.film()) {
      const review = {
        filmId: this.film()!.id,
        rating: this.reviewForm.get('rating')?.value,
        title: this.reviewForm.get('title')?.value,
        reviewText: this.reviewForm.get('reviewText')?.value,
        isSpoiler: this.reviewForm.get('isSpoiler')?.value,
        mood: this.reviewForm.get('mood')?.value,
        dateWatched: this.reviewForm.get('dateWatched')?.value ? new Date(this.reviewForm.get('dateWatched')?.value) : undefined
      };
      
      this.uiState.addFilmReview(review);
      this.reviewForm.reset({ rating: 0, isSpoiler: false });
      this.loadReviews(this.film()!.id);
    }
  }

  deleteNote(note: FilmNote): void {
    this.uiState.deleteFilmNote(note.filmId, note.timestamp);
    if (this.film()) {
      this.loadNotes(this.film()!.id);
    }
  }

  deleteReview(review: FilmReview): void {
    this.uiState.deleteFilmReview(review.filmId, review.timestamp);
    if (this.film()) {
      this.loadReviews(this.film()!.id);
    }
  }

  isFavorite(): boolean {
    return this.film() ? this.uiState.isFavorite(this.film()!.id) : false;
  }

  toggleFavorite(): void {
    if (this.film()) {
      this.uiState.toggleFavorite(this.film()!.id);
    }
  }
}
