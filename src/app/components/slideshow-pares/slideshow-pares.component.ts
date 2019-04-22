import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];
  @Output() cargarMas = new EventEmitter();

  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -10
  };
  

  constructor( public modalController: ModalController) { }

  ngOnInit() {}

  onClick(){
    // console.log('Cargar mas');
    this.cargarMas.emit();
  }

  async varDetalle(id: string){
   
    const modal = await this.modalController.create({
    component: DetalleComponent,
    componentProps: { id }
    });
  
    await modal.present();
  
  }

}
