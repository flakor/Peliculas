import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaMDB } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;
const language = 'es';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>( query: string){

      query = URL + query;

      query = query + `&api_key=${apiKey}&language=${language}&include_image_language=${language}`;

      return this.http.get<T>(query);
  }

  getPopulares() {
    const query = '/discover/movie?sort_by=popularity.desc';
    return this.ejecutarQuery<RespuestaMDB>( query );

  }

  getFeature(){

    const hoy  = new Date();
    const ultimoDia = new Date(hoy.getFullYear(),hoy.getMonth() + 1, 0).getDate();

    const mes = hoy.getMonth() + 1;
    let mesString;

    if (mes < 10) {
      mesString = '0' + mes;
    } else {
      mesString = mes;
    }

    const inicio = `${ hoy.getFullYear()}-${mesString}-01`;
    const fin = `${ hoy.getFullYear()}-${mesString}-${ultimoDia}`;


    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`);
  
  }
}
