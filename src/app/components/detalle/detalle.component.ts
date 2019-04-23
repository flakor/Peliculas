import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {
  @Input() id;
  pelicula: PeliculaDetalle = {};
  actores: Cast[] = [];
  oculto = 150;
  estrella = 'star-outline';
  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  };

  constructor(private moviesService: MoviesService,
              public modalController: ModalController,
              private dataLocal: DataLocalService) { }

  ngOnInit() {
    // console.log('ID', this.id);
    this.dataLocal.existePelicula(this.id)
    .then( existe => this.estrella = ( existe ) ? 'star' : 'star-outline' );


    this.moviesService.getPeliculaDetalle(this.id).subscribe((data) => {
      // console.log(data);

      this.pelicula = data;
    });

    this.moviesService.getActores(this.id).subscribe((data) => {
      console.log(data);

      this.actores = data.cast;
    });
  }

  regresar() {
    this.modalController.dismiss();
  }
  favorito() { 
    this.dataLocal.guardarPelicula(this.pelicula)
    .then( existe => this.estrella = ( existe ) ? 'star' : 'star-outline' );
  }
}
