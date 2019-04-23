import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  textoBuscar = '';
  ideas: string[] = ['Spiderman', 'Avenger', 'Hell boy', 'El señor de los anillos'];
  peliculas: Pelicula[] = [];
  buscando = false;
  constructor(private moviesService: MoviesService,
                      public modalController: ModalController){}

  buscar(event){

    const valor: string = event.detail.value;
    if (valor.length === 0) {
      this.buscando = false;
      this.peliculas = [];
      return;
    }
    // console.log(valor);
    this.buscando = true;
    this.moviesService.getPelicula(valor).subscribe(data =>{
      console.log(data);
      this.peliculas = data.results;
      this.buscando = false;
    })
    
  }

  async verDetalle(id: string){
   
    const modal = await this.modalController.create({
    component: DetalleComponent,
    componentProps: { id }
    });
  
    await modal.present();
  
  }
}
