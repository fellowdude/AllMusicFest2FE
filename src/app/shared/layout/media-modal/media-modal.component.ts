import { Component } from '@angular/core';
import { MediaModalService } from '../../services/layout/media-modal/media-modal.service';
import { IMediaModalData } from '../../interfaces/media-modal.interface';

@Component({
  selector: 'app-media-modal',
  templateUrl: './media-modal.component.html',
  styleUrls: ['./media-modal.component.scss']
})
export class MediaModalComponent {
  modalData!: IMediaModalData | null;
  closedModal: boolean =  true;
  constructor(private mediaModalService: MediaModalService){
    this.mediaModalService.modalDataChange.subscribe({
      next: (response) => {
        this.modalData = response;
        this.closedModal = false;
      }
    })
  }

  closeModal(event: any): void {
    this.closedModal = true;
    event.preventDefault();
  }
}
