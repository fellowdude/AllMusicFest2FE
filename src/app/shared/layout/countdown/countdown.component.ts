import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit{
  startDate: Date = new Date();
  @Input() endDate: Date = new Date('2023-10-17');
  timeLeft: any = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  }

  ngOnInit(): void {
    let interval = setInterval(
      ()=>{
        this.calculateTime();
        if (this.timeLeft.days < 0) {
          this.timeLeft = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
          }
          clearInterval(interval);
        }
      }, 1000
    )
  }

  calculateTime(): void {
    this.startDate = new Date();
    let diff = this.endDate.getTime() - this.startDate.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor(diff / (1000 * 60));
    const secs = Math.floor(diff / 1000);

    this.timeLeft.days = days;
    this.timeLeft.hours = hours - days * 24;
    this.timeLeft.minutes = mins - hours * 60;
    this.timeLeft.seconds = secs - mins * 60;
  }
}
