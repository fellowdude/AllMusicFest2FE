import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IMediaModalData } from 'src/app/shared/interfaces/media-modal.interface';

@Injectable({
  providedIn: 'root'
})
export class MediaModalService {
  private modalData = new BehaviorSubject<IMediaModalData | null>(null);
  modalDataChange = this.modalData.asObservable();
  constructor() { }

  newModalData(modalData: IMediaModalData): void {
    this.modalData.next(modalData);
  }
}
