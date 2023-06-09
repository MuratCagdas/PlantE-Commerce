import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { RouterModule } from '@angular/router';
import { DeleteModule } from 'src/app/directives/delete/delete.module';



@NgModule({
  declarations: [
    OrdersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:OrdersComponent}
    ]),
    DeleteModule
  ]
})
export class OrdersModule { }
