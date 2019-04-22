import { Component, OnInit, Input } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];
  

  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true
  };

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  async varDetalle(id: string){
   
    const modal = await this.modalController.create({
    component: DetalleComponent,
    componentProps: { id }
    });
  
    await modal.present();
  
  }

}
