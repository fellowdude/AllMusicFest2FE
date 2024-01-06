import { Component } from '@angular/core';
import { RaffleModalService } from '../../services/layout/raffle-modal/raffle-modal.service';
import { IRaffleModalData } from '../../interfaces/raffle-modal.interface';

@Component({
  selector: 'app-raffle-modal',
  templateUrl: './raffle-modal.component.html',
  styleUrls: ['./raffle-modal.component.scss']
})
export class RaffleModalComponent {
  modalData!: IRaffleModalData | null;
  closedModal: boolean =  true;
  constructor(private mediaModalService: RaffleModalService){
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
