import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Film } from '../models/film.model';
import { Person } from '../models/person.model';
import { Location } from '../models/location.model';
import { Species } from '../models/species.model';
import { Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class GhibliApiService {
  private readonly baseUrl = 'https://ghibliapi.vercel.app';

  constructor(private http: HttpClient) {}

  /**
   * Get all films from the Ghibli API
   */
  getFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(`${this.baseUrl}/films`);
  }

  /**
   * Get a single film by ID
   */
  getFilm(id: string): Observable<Film> {
    return this.http.get<Film>(`${this.baseUrl}/films/${id}`);
  }

  /**
   * Get all people from the Ghibli API
   */
  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.baseUrl}/people`);
  }

  /**
   * Get a single person by ID
   */
  getPerson(id: string): Observable<Person> {
    return this.http.get<Person>(`${this.baseUrl}/people/${id}`);
  }

  /**
   * Get all locations from the Ghibli API
   */
  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.baseUrl}/locations`);
  }

  /**
   * Get a single location by ID
   */
  getLocation(id: string): Observable<Location> {
    return this.http.get<Location>(`${this.baseUrl}/locations/${id}`);
  }

  /**
   * Get all species from the Ghibli API
   */
  getSpecies(): Observable<Species[]> {
    return this.http.get<Species[]>(`${this.baseUrl}/species`);
  }

  /**
   * Get a single species by ID
   */
  getSingleSpecies(id: string): Observable<Species> {
    return this.http.get<Species>(`${this.baseUrl}/species/${id}`);
  }

  /**
   * Get all vehicles from the Ghibli API
   */
  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.baseUrl}/vehicles`);
  }

  /**
   * Get a single vehicle by ID
   */
  getVehicle(id: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.baseUrl}/vehicles/${id}`);
  }
}
