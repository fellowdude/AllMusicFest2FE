import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MapService } from './services/map.service';
import { StadiumPopupService } from 'src/app/shared/services/layout/stadium-popup/stadium-popup.service';
import { IStadiumPopupData } from 'src/app/shared/interfaces/stadium-popup.interface';

@Component({
  selector: 'app-interactive-stadium',
  templateUrl: './interactive-stadium.component.html',
  styleUrls: ['./interactive-stadium.component.scss'],
})
export class InteractiveStadiumComponent implements AfterViewInit, OnDestroy, OnInit{
  popupData!: IStadiumPopupData;
  firstClick: boolean = true;
  @ViewChild('rCanvas', {static: true}) canvasRef!: ElementRef<HTMLCanvasElement>;
  constructor(
    private readonly mapService: MapService, private stadiumPopupService: StadiumPopupService
  ) {
    this.stadiumPopupService.popupDataChange.subscribe({
      next: (response) => {
        console.log(response);
        if(response){
          this.popupData = response;
        }
      }
    })
  }

  ngOnInit(): void {
    this.initScene();
  }

  initScene(){
    const scene = this.mapService.createScene(this.canvasRef);
  }

  ngAfterViewInit(): void {
    this.mapService.start(true);
  }

  ngOnDestroy(): void {
  }

  returnToView(): void { 
    this.stadiumPopupService.toggleModal(false);
  }

  round(number: number): number{
    return  Math.round(number);
  }
}
