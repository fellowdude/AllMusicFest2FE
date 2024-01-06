import { Component } from '@angular/core';
import { MediaModalService } from 'src/app/shared/services/layout/media-modal/media-modal.service';
import { RaffleModalService } from 'src/app/shared/services/layout/raffle-modal/raffle-modal.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private mediaModalService:MediaModalService, private raffleModalService:RaffleModalService){
    /* this.mediaModalService.newModalData({
      link: 'assets/videos/amf2_v2.mp4',
      type: 'video'
    }) */
    /* this.raffleModalService.newModalData({
      active: true,
      buttonText: 'PARTICIPAR',
      imageLink: 'assets/images/amf-raffle.png',
      outLink: environment.surveyLink || 'https://amf2.vibraaevents.com'
    }) */

    this.mediaModalService.newModalData({
      link: '',
      type: 'message'
    })
  }
}
