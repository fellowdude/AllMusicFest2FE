import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IRaffleModalData } from 'src/app/shared/interfaces/raffle-modal.interface';

@Injectable({
  providedIn: 'root'
})
export class RaffleModalService {
  private modalData = new BehaviorSubject<IRaffleModalData | null>(null);
  modalDataChange = this.modalData.asObservable();
  constructor() { }

  newModalData(modalData: IRaffleModalData): void {
    this.modalData.next(modalData);
  }
}
