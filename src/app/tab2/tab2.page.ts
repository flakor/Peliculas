import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  textoBuscar = '';
  ideas: string[] = ['Spiderman', 'Avenger', 'Hell boy', 'El señor de los anillos'];

  constructor(private moviesService: MoviesService){}

  buscar(event){
    // console.log(event);
    
    const valor = event.detail.value;
    console.log(valor);
    this.moviesService.getPelicula(valor).subscribe(data =>{
      console.log(data);
      
    })
    
  }
}
