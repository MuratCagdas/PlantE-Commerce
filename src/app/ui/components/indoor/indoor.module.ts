import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndoorComponent } from './indoor.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../layout/layout.module';
import {MatIconModule} from '@angular/material/icon';
import { DeleteModule } from 'src/app/directives/delete/delete.module';



@NgModule({
  declarations: [
    IndoorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:IndoorComponent}
    ]),
    LayoutModule,
    MatIconModule,
    DeleteModule
  ]
})
export class IndoorModule { }
