import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GhibliApiService } from '../../services/ghibli-api.service';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-people-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './people-list.component.html',
  styleUrl: './people-list.component.css'
})
export class PeopleListComponent implements OnInit {
  people = signal<Person[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(private ghibliApi: GhibliApiService) {}

  ngOnInit(): void {
    this.loadPeople();
  }

  loadPeople(): void {
    this.loading.set(true);
    this.error.set(null);

    this.ghibliApi.getPeople().subscribe({
      next: (people) => {
        this.people.set(people);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load characters. Please try again later.');
        this.loading.set(false);
        console.error('Error loading people:', err);
      }
    });
  }
}
