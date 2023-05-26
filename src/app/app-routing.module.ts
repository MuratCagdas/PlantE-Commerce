import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { HomeComponent } from './ui/components/home/home.component';
import { AuthGuard } from './guard/auth/auth.guard';
import { RoleGuard } from './guard/role/role.guard';
import { ProductsComponent } from './admin/components/products/products.component';


const routes: Routes = [
  {
    path: "admin", component: LayoutComponent, children: [
      {
        path: "", component: ProductsComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'admin' }
      },
      {
        path: "orders", loadChildren: () => import("./admin/components/orders/orders.module").then
          (module => module.OrdersModule),
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'admin' }
      }
    ]
  },
  { path: "", component: HomeComponent },
  {
    path: "baskets", loadChildren: () => import("./ui/components/baskets/baskets.module").then
      (module => module.BasketsModule),
      canActivate: [AuthGuard, RoleGuard],
      data: { role: ['user', 'admin'] }
  },
  {
    path: "gifts", loadChildren: () => import("./ui/components/gifts/gifts.module").then
      (module => module.GiftsModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: ['user', 'admin'] }
  },
  {
    path: "login", loadChildren: () => import("./ui/components/login/login.module").then
      (module => module.LoginModule)
  },
  {
    path: "indoor", loadChildren: () => import("./ui/components/indoor/indoor.module").then
      (module => module.IndoorModule),
  },
  {
    path: "outdoor", loadChildren: () => import("./ui/components/outdoor/outdoor.module").then
      (module => module.OutdoorModule)
  },
  {
    path: "pots", loadChildren: () => import("./ui/components/pots/pots.module").then
      (module => module.PotsModule),
  },
  {
    path: "login", loadChildren: () => import("./ui/components/login/login.module").then
      (module => module.LoginModule)
  },
  {
    path: "register", loadChildren: () => import("./ui/components/register/register.module").then
      (module => module.RegisterModule)
  }, {
    path: "like", loadChildren: () => import("./ui/components/like/like.module").then
      (module => module.LikeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
