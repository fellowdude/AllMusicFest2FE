import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IStadiumPopupData } from 'src/app/shared/interfaces/stadium-popup.interface';

@Injectable({
  providedIn: 'root'
})
export class StadiumPopupService {

  private popupData = new BehaviorSubject<IStadiumPopupData | null>({
    active: false,
    description: {},
    imageLink: '',
    title: ''
  });
  popupDataChange = this.popupData.asObservable();
  constructor() { }

  newModalData(popupData: IStadiumPopupData): void {
    this.popupData.next(popupData);
  }

  toggleModal(active: boolean): void {
    let data = this.popupData.value;
    data && (data.active = active);
    this.popupData.next(data);
  }

  return(): void {
    this.popupData.next({
      active: false,
      description: {},
      imageLink: '',
      title: ''
    });
  }
}
