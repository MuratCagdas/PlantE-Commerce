import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiftsComponent } from './gifts.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../layout/layout.module';
import { MatIconModule } from '@angular/material/icon';
import { DeleteModule } from 'src/app/directives/delete/delete.module';



@NgModule({
  declarations: [
    GiftsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:GiftsComponent}
    ]),
    LayoutModule,
    MatIconModule,
    DeleteModule
  ]
})
export class GiftsModule { }
