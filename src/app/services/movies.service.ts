import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaMDB, PeliculaDetalle, Actores, Genre } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;
const language = 'es';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private popularesPage = 0;
  generos: Genre[] = [];

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string) {
    query = URL + query;

    query = query + `&api_key=${apiKey}&language=${language}&include_image_language=${language}`;
    // console.log(query);

    return this.http.get<T>(query);
  }

  getPopulares() {
    this.popularesPage++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;
    return this.ejecutarQuery<RespuestaMDB>(query);
  }

  getFeature() {
    const hoy = new Date();
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();

    const mes = hoy.getMonth() + 1;
    let mesString;

    if (mes < 10) {
      mesString = '0' + mes;
    } else {
      mesString = mes;
    }

    const inicio = `${hoy.getFullYear()}-${mesString}-01`;
    const fin = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;

    return this.ejecutarQuery<RespuestaMDB>(
      `/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`
    );
  }

  getPeliculaDetalle(id: string) {
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?a=1`);
  }

  getActores(id: string) {
    return this.ejecutarQuery<Actores>(`/movie/${id}/credits?a=1`);
  }

  getPelicula(texto: string) {
    return this.ejecutarQuery<RespuestaMDB>(`/search/movie?query=${texto}`);
  }
  cargarGeneros(): Promise<Genre[]> {

    return new Promise((resolve, reject) => {
      this.ejecutarQuery(`/genre/movie/list?a=1`).subscribe(resp =>{
        this.generos = resp['genres'];
      // console.log(this.generos);
        resolve(this.generos);
      });
    });
 
  }
}
