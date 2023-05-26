import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from "../layout/layout.module";



@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: "", component: HomeComponent }
        ]),
        LayoutModule,
    ]
})
export class HomeModule { }
