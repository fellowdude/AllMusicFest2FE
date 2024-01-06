import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { IRegistration } from 'src/app/shared/interfaces/registration.interface';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private apiService: ApiService) { }

  sendRegistration(registrationBody: IRegistration) {
    return this.apiService.post('form', registrationBody);
  }
}
