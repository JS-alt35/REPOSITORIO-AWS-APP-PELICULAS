import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PeliculaService } from '../../services/pelicula-service';
import { Pelicula } from '../../model/pelicula';

@Component({
  selector: 'app-peliculas',
  imports: [FormsModule],
  templateUrl: './peliculas.html',
  styleUrl: './peliculas.css',
})
export class Peliculas {
  private servicioPelicula = inject(PeliculaService);

  listaPeliculas = signal<Pelicula[]>([]);

  nuevaPelicula: Pelicula = {
    titulo: '',
    genero: '',
    director: '',
    anioEstreno: 0,
    duracion: 0,
    calificacion: 0,
  };

  ngOnInit() {
    this.obtenerPeliculas();
  }

  obtenerPeliculas() {
    this.servicioPelicula.getPeliculas().subscribe({
      next: (datosPeliculas) => {
        this.listaPeliculas.set(datosPeliculas);
      },
      error: (error) => {
        console.error('Error al obtener películas:', error);
      },
    });
  }

  eliminarPelicula(id: number) {
    const confirmacion = confirm(
      '¿Está seguro de eliminar esta película?'
    );

    if (!confirmacion) {
      return;
    }

    this.servicioPelicula.deletePelicula(id).subscribe({
      next: () => {
        this.obtenerPeliculas();
      },
      error: (error) => {
        console.error('Error al eliminar la película:', error);
      },
    });
  }

  seleccionarParaEditar(pelicula: Pelicula) {
    this.nuevaPelicula = { ...pelicula };
  }

  guardarPelicula() {
    if (this.nuevaPelicula.id) {
      this.servicioPelicula
        .putPelicula(this.nuevaPelicula.id, this.nuevaPelicula)
        .subscribe({
          next: () => {
            this.obtenerPeliculas();
            this.resetear();
          },
          error: (error) => {
            console.error('Error al actualizar la película:', error);
          },
        });
    } else {
      this.servicioPelicula
        .postPelicula(this.nuevaPelicula)
        .subscribe({
          next: () => {
            this.obtenerPeliculas();
            this.resetear();
          },
          error: (error) => {
            console.error('Error al registrar la película:', error);
          },
        });
    }
  }

  resetear() {
    this.nuevaPelicula = {
      titulo: '',
      genero: '',
      director: '',
      anioEstreno: 0,
      duracion: 0,
      calificacion: 0,
    };
  }
}