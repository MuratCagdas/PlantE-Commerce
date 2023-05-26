import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LikeComponent } from './like.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../layout/layout.module';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    LikeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:LikeComponent}
    ]),
    LayoutModule,
    MatIconModule
  ]
})
export class LikeModule { }
