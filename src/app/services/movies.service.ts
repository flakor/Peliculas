import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getFeature(){

    return this.http.get(` https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2019-02-15&primary_release_date.lte=2019-03-31&api_key=c663c82e3cdbed01baa5688f015a6a98&language=es&include_image_language=es`);

  }
}
