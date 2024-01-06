import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { CountdownComponent } from './layout/countdown/countdown.component';
import { LeftPadPipe } from './pipes/left-pad/left-pad.pipe';
import { SparksComponent } from './layout/sparks/sparks.component';
import { MediaModalComponent } from './layout/media-modal/media-modal.component';
import { TooltipComponent } from './layout/tooltip/tooltip.component';
import { TooltipDirective } from './layout/tooltip/tooltip.directive';
import { FloatingButtonComponent } from './layout/floating-button/floating-button.component';
import { SafeUrlPipe } from './pipes/safe-url/safe-url.pipe';
import { RaffleModalComponent } from './layout/raffle-modal/raffle-modal.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CountdownComponent,
    LeftPadPipe,
    SparksComponent,
    MediaModalComponent,
    TooltipComponent,
    TooltipDirective,
    FloatingButtonComponent,
    SafeUrlPipe,
    RaffleModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    CountdownComponent,
    LeftPadPipe,
    SparksComponent,
    MediaModalComponent,
    TooltipDirective,
    FloatingButtonComponent,
    RaffleModalComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }
