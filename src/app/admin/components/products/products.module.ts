import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { DialogsModule } from 'src/app/dialogs/dialogs.module';
import { MatIconModule } from '@angular/material/icon';
import { DeleteModule } from 'src/app/directives/delete/delete.module';



@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:ProductsComponent}
    ]),
    DialogsModule,
    MatIconModule,
    DeleteModule
  ]
})
export class ProductsModule { }
