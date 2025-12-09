import { Injectable, signal } from '@angular/core';

export interface FilmNote {
  filmId: string;
  note: string;
  timestamp: Date;
}

export interface FilmReview {
  filmId: string;
  rating: number; // 1-5 stars
  title: string;
  reviewText: string;
  isSpoiler: boolean;
  mood: string;
  dateWatched?: Date;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class UiStateService {
  // Local favorites stored in memory
  private favoritesSignal = signal<string[]>([]);
  
  // Film notes stored in memory
  private filmNotesSignal = signal<FilmNote[]>([]);

  // Film reviews stored in memory
  private filmReviewsSignal = signal<FilmReview[]>([]);

  // Dark mode toggle
  private darkModeSignal = signal<boolean>(true);

  constructor() {
    // Load from localStorage if available
    this.loadFromStorage();
  }

  /**
   * Get favorites as a signal
   */
  get favorites() {
    return this.favoritesSignal.asReadonly();
  }

  /**
   * Get film notes as a signal
   */
  get filmNotes() {
    return this.filmNotesSignal.asReadonly();
  }

  /**
   * Get film reviews as a signal
   */
  get filmReviews() {
    return this.filmReviewsSignal.asReadonly();
  }

  /**
   * Get dark mode state as a signal
   */
  get darkMode() {
    return this.darkModeSignal.asReadonly();
  }

  /**
   * Add a film to favorites
   */
  addFavorite(filmId: string): void {
    const current = this.favoritesSignal();
    if (!current.includes(filmId)) {
      this.favoritesSignal.set([...current, filmId]);
      this.saveToStorage();
    }
  }

  /**
   * Remove a film from favorites
   */
  removeFavorite(filmId: string): void {
    const current = this.favoritesSignal();
    this.favoritesSignal.set(current.filter(id => id !== filmId));
    this.saveToStorage();
  }

  /**
   * Check if a film is in favorites
   */
  isFavorite(filmId: string): boolean {
    return this.favoritesSignal().includes(filmId);
  }

  /**
   * Toggle favorite status for a film
   */
  toggleFavorite(filmId: string): void {
    if (this.isFavorite(filmId)) {
      this.removeFavorite(filmId);
    } else {
      this.addFavorite(filmId);
    }
  }

  /**
   * Add a note to a film
   */
  addFilmNote(filmId: string, note: string): void {
    const current = this.filmNotesSignal();
    const newNote: FilmNote = {
      filmId,
      note,
      timestamp: new Date()
    };
    this.filmNotesSignal.set([...current, newNote]);
    this.saveToStorage();
  }

  /**
   * Get notes for a specific film
   */
  getFilmNotes(filmId: string): FilmNote[] {
    return this.filmNotesSignal().filter(note => note.filmId === filmId);
  }

  /**
   * Delete a note
   */
  deleteFilmNote(filmId: string, timestamp: Date): void {
    const current = this.filmNotesSignal();
    this.filmNotesSignal.set(
      current.filter(note => !(note.filmId === filmId && note.timestamp === timestamp))
    );
    this.saveToStorage();
  }

  /**
   * Add a review to a film
   */
  addFilmReview(review: Omit<FilmReview, 'timestamp'>): void {
    const current = this.filmReviewsSignal();
    const newReview: FilmReview = {
      ...review,
      timestamp: new Date()
    };
    this.filmReviewsSignal.set([...current, newReview]);
    this.saveToStorage();
  }

  /**
   * Get reviews for a specific film
   */
  getFilmReviews(filmId: string): FilmReview[] {
    return this.filmReviewsSignal().filter(review => review.filmId === filmId);
  }

  /**
   * Delete a review
   */
  deleteFilmReview(filmId: string, timestamp: Date): void {
    const current = this.filmReviewsSignal();
    this.filmReviewsSignal.set(
      current.filter(review => !(review.filmId === filmId && review.timestamp === timestamp))
    );
    this.saveToStorage();
  }

  /**
   * Toggle dark mode
   */
  toggleDarkMode(): void {
    this.darkModeSignal.update(value => !value);
    this.saveToStorage();
  }

  /**
   * Save state to localStorage
   */
  private saveToStorage(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('ghibli_favorites', JSON.stringify(this.favoritesSignal()));
      localStorage.setItem('ghibli_notes', JSON.stringify(this.filmNotesSignal()));
      localStorage.setItem('ghibli_reviews', JSON.stringify(this.filmReviewsSignal()));
      localStorage.setItem('ghibli_dark_mode', JSON.stringify(this.darkModeSignal()));
    }
  }

  /**
   * Load state from localStorage
   */
  private loadFromStorage(): void {
    if (typeof localStorage !== 'undefined') {
      const favorites = localStorage.getItem('ghibli_favorites');
      const notes = localStorage.getItem('ghibli_notes');
      const reviews = localStorage.getItem('ghibli_reviews');
      const darkMode = localStorage.getItem('ghibli_dark_mode');

      if (favorites) {
        this.favoritesSignal.set(JSON.parse(favorites));
      }
      if (notes) {
        this.filmNotesSignal.set(JSON.parse(notes));
      }
      if (reviews) {
        this.filmReviewsSignal.set(JSON.parse(reviews));
      }
      if (darkMode) {
        this.darkModeSignal.set(JSON.parse(darkMode));
      }
    }
  }
}
