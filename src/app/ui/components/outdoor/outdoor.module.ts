import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutdoorComponent } from './outdoor.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../layout/layout.module';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    OutdoorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:OutdoorComponent}
    ]),
    LayoutModule,
    MatIconModule,
  ]
})
export class OutdoorModule { }
