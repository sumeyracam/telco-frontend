import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppStoreState } from './store/app.state';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { CardsComponent } from './pages/cards/cards.component';
import { CreateCustomerComponent } from './pages/create-customer/create-customer.component';
import { CreateFakeArrayPipe } from './pipes/create-fake-array.pipe';
import { CustomerDetailComponent } from './pages/customer-detail/customer-detail.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { FilterCorporateCustomersPipe } from './pipes/filter-corporate-customers.pipe';
import { FilterServicePipe } from './pipes/filter-service.pipe';
import { FooterComponent } from './pages/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './pages/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { JwtModule } from "@auth0/angular-jwt";
import { ListviewComponent } from './components/listview/listview.component';
import { LoadingComponent } from './pages/loading/loading.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { OverlayTitleComponent } from './components/overlay-title/overlay-title.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SplitPipe } from './pipes/split.pipe';
import { StoreModule } from '@ngrx/store';
import { ToastrModule } from 'ngx-toastr';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { appReducers } from './store/app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    ListviewComponent,
    ProductListComponent,
    CreateFakeArrayPipe,
    SplitPipe,
    CardsComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    LoadingComponent,
    LoginComponent,
    FilterServicePipe,
    CustomersComponent,
    CustomerDetailComponent,
    FilterCorporateCustomersPipe,
    OverlayTitleComponent,
    CreateCustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {positionClass: 'toast-bottom-center'},
    ),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        }
      },
    }),
    StoreModule.forRoot<AppStoreState>(appReducers)
  ],
  exports: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
