import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GhibliApiService } from '../../services/ghibli-api.service';
import { Location } from '../../models/location.model';

@Component({
  selector: 'app-locations-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './locations-list.component.html',
  styleUrl: './locations-list.component.css'
})
export class LocationsListComponent implements OnInit {
  locations = signal<Location[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(private ghibliApi: GhibliApiService) {}

  ngOnInit(): void {
    this.loadLocations();
  }

  loadLocations(): void {
    this.loading.set(true);
    this.error.set(null);

    this.ghibliApi.getLocations().subscribe({
      next: (locations) => {
        this.locations.set(locations);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load locations. Please try again later.');
        this.loading.set(false);
        console.error('Error loading locations:', err);
      }
    });
  }
}
