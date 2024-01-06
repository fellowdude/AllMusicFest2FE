import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaModalService } from 'src/app/shared/services/layout/media-modal/media-modal.service';

@Component({
  selector: 'app-price-section',
  templateUrl: './price-section.component.html',
  styleUrls: ['./price-section.component.scss']
})
export class PriceSectionComponent {
  today: Date = new Date();
  hweenSaleDateIni: Date = new Date('2023-10-12 00:00');
  hweenSaleDateEnd: Date = new Date('2023-10-16 23:59');
  preSaleDate: Date = new Date('2023-11-11 00:00');
  eventDate: Date = new Date('2023-11-17 16:00');
  mainImage: string = 'assets/images/mapa.png';
  images: Array<string> = [
    'assets/images/mapa.png',
    'assets/images/ZONA_EXPERIENCE2.png',
    'assets/images/BOX_ROYAL2.png',
    'assets/images/BOX_FRONT_STAGE2.png'
  ];
  tooltipHTML: string = '<div class="col-12"><p class="my-1"><strong>¿Qué es VIDEO EXPERIENCE?</strong></p><p class="my-1">Es un compilado de videos e imágenes tomadas desde 8 cámaras distribuidas por todo el evento, incluido las del Dron en el cielo y grabaciones en la zona de Boxes y Ultra Experience, así como algunas entrevistas a los artistas desde su llegada al país y en camerinos. Se les entregará un link; después de un registro de sus datos en el mismo local, en máximo <strong>48 horas</strong> culminado el evento para la edición y entrega del video que es como un <strong>SOUVENIR OFICIAL</strong> del <strong>All Music Fest</strong>.</p></div>'
  sn: string = '';
  buttonActive: boolean = true;
  active3D: boolean = false;
  constructor(private mediaModalService: MediaModalService, private route: ActivatedRoute) {

    this.route.queryParams
      .subscribe(params => {
        if(params['sn']){
          this.sn = params['sn'];
        }
      })
  }

  openModal(link: string): void {
    this.mediaModalService.newModalData({
      type: 'image',
      link: link
    })
  }

  changeMainImage(image: string, index: number): void {
    this.mainImage = image;
    this.active3D = false;
    if(index == 0){
      this.buttonActive = true;
    } else {
      this.buttonActive = false;
    }
  }

  switchTo3D(): void {
    this.active3D = !this.active3D;
  }

  returnImage(): void {
    this.mainImage = 'assets/images/mapa.png';
  }

  trackClick(): void {
    gtag('event', 'forward', {
      event_label: 'Ticket button',
      description: 'To teleticket, from: ' + (this.sn === ''? 'Home' : this.sn),
    })
  }
}
