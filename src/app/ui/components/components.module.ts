import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketsModule } from './baskets/baskets.module';
import { HomeModule } from './home/home.module';
import { LayoutModule } from './layout/layout.module';
import { GiftsModule } from './gifts/gifts.module';
import { IndoorModule } from './indoor/indoor.module';
import { OutdoorModule } from './outdoor/outdoor.module';
import { PotsModule } from './pots/pots.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { LikeModule } from './like/like.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BasketsModule,
    HomeModule,
    LayoutModule,
    GiftsModule,
    IndoorModule,
    OutdoorModule,
    PotsModule,
    LoginModule,
    RegisterModule,
    LikeModule
  ]
})
export class ComponentsModule { }
