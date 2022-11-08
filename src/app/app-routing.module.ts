import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { CreateCustomerComponent } from './pages/create-customer/create-customer.component';
import { CustomerDetailComponent } from './pages/customer-detail/customer-detail.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {path: "", pathMatch: 'full', redirectTo : 'home'},
  {path: "home", component : HomeComponent,canActivate:[LoginGuard] },
  {path: "login", component : LoginComponent },
  {
    path: "customers",
    component : CustomersComponent,
    canActivate:[LoginGuard]
  },
  {
    path: 'customer-detail/:id',
    component: CustomerDetailComponent,
    canActivate:[LoginGuard]
  },
  {
    path: 'create-customer',
    component: CreateCustomerComponent,
    canActivate: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
