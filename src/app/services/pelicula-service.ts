import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pelicula } from '../model/pelicula';

@Injectable({
  providedIn: 'root',
})
export class PeliculaService {
  private http = inject(HttpClient);

  private API_PELICULAS = '/api/peliculas';

  // Obtener todas las películas
  getPeliculas(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(this.API_PELICULAS);
  }

  // Registrar una película
  postPelicula(pelicula: Pelicula): Observable<Pelicula> {
    return this.http.post<Pelicula>(
      `${this.API_PELICULAS}/guardarPelicula`,
      pelicula
    );
  }

  // Actualizar una película
  putPelicula(id: number, pelicula: Pelicula): Observable<Pelicula> {
    return this.http.put<Pelicula>(
      `${this.API_PELICULAS}/actualizarPelicula/${id}`,
      pelicula
    );
  }

  // Eliminar una película
  deletePelicula(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.API_PELICULAS}/eliminarPelicula/${id}`
    );
  }
}