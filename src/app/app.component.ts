import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'All Music Fest 2';
  constructor(private route : ActivatedRoute, private router: Router) {
    this.route.queryParams
      .subscribe(params => {
        if(params['sn']){
          console.log('trigger ' + params['sn']);
          gtag('event', 'page_view', {
            page_title: 'Home',
            description: 'From ' + params['sn'],
          })
        }else{
          console.log('no trigger');
          gtag('event', 'page_view', {
            page_title: 'Home'
          })
        }
      }
    );
  }
}
