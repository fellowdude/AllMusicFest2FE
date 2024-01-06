import { Component } from '@angular/core';
import { MediaModalService } from '../../services/layout/media-modal/media-modal.service';

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.scss']
})
export class FloatingButtonComponent {
  constructor(private mediaModalService: MediaModalService) {

  }

  openModal(): void {
    this.mediaModalService.newModalData({
      link: 'assets/videos/amf2_v2.mp4',
      type: 'video'
    })
  }
}
