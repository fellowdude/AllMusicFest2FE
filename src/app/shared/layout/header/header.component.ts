import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menuOpen: boolean = false;
  menuVisible: boolean = false;
  linkRaffle: string = environment.surveyLink;
  toggleMenu(){
    this.menuVisible = true;
    this.menuOpen = !this.menuOpen;
  }
}
