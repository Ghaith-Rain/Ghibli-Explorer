import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GhibliApiService } from '../../services/ghibli-api.service';
import { Vehicle } from '../../models/vehicle.model';
import { TruncateTextPipe } from '../../pipes/truncate-text.pipe';

@Component({
  selector: 'app-vehicles-list',
  standalone: true,
  imports: [CommonModule, TruncateTextPipe],
  templateUrl: './vehicles-list.component.html',
  styleUrl: './vehicles-list.component.css'
})
export class VehiclesListComponent implements OnInit {
  vehicles = signal<Vehicle[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(private ghibliApi: GhibliApiService) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.loading.set(true);
    this.error.set(null);

    this.ghibliApi.getVehicles().subscribe({
      next: (vehicles) => {
        this.vehicles.set(vehicles);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load vehicles. Please try again later.');
        this.loading.set(false);
        console.error('Error loading vehicles:', err);
      }
    });
  }
}
