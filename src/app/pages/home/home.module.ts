import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { BannerComponent } from './banner/banner.component';
import { PriceSectionComponent } from './price-section/price-section.component';
import { LegalSectionComponent } from './legal-section/legal-section.component';
import { InteractiveStadiumComponent } from './price-section/interactive-stadium/interactive-stadium.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: {title: 'Home'}},
];

@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    PriceSectionComponent,
    LegalSectionComponent,
    InteractiveStadiumComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class HomeModule { }
