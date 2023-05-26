import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketsComponent } from './baskets.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../layout/layout.module';
import { MatIconModule } from '@angular/material/icon';
import { DeleteModule } from 'src/app/directives/delete/delete.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BasketsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:BasketsComponent}
    ]),
    LayoutModule,
    MatIconModule,
    DeleteModule,
    FormsModule
  ]
})
export class BasketsModule { }
