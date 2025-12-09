import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GhibliApiService } from '../../services/ghibli-api.service';
import { Species } from '../../models/species.model';

@Component({
  selector: 'app-species-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './species-list.component.html',
  styleUrl: './species-list.component.css'
})
export class SpeciesListComponent implements OnInit {
  speciesList = signal<Species[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(private ghibliApi: GhibliApiService) {}

  ngOnInit(): void {
    this.loadSpecies();
  }

  loadSpecies(): void {
    this.loading.set(true);
    this.error.set(null);

    this.ghibliApi.getSpecies().subscribe({
      next: (species) => {
        this.speciesList.set(species);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load species. Please try again later.');
        this.loading.set(false);
        console.error('Error loading species:', err);
      }
    });
  }
}
