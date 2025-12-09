import { Routes } from '@angular/router';
import { FilmListComponent } from './components/film-list/film-list.component';
import { FilmDetailComponent } from './components/film-detail/film-detail.component';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { LocationsListComponent } from './components/locations-list/locations-list.component';
import { SpeciesListComponent } from './components/species-list/species-list.component';
import { VehiclesListComponent } from './components/vehicles-list/vehicles-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/films', pathMatch: 'full' },
  { path: 'films', component: FilmListComponent },
  { path: 'films/:id', component: FilmDetailComponent },
  { path: 'people', component: PeopleListComponent },
  { path: 'locations', component: LocationsListComponent },
  { path: 'species', component: SpeciesListComponent },
  { path: 'vehicles', component: VehiclesListComponent },
  { path: '**', redirectTo: '/films' }
];
