import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { CorporateCustomers } from 'src/app/models/corporateCustomers';
import { CorporateCustomersService } from 'src/app/services/corporate-customers.service';
import { Customer } from 'src/app/models/customer';
import { IndividualCustomers } from 'src/app/models/individualCustomers';
import { IndividualCustomersService } from 'src/app/services/individual-customers.service';
import { Service } from 'src/app/models/service';
import { ServicesService } from 'src/app/services/services.service';
import { Subscription } from 'src/app/models/subscription';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  individualCustomer!:IndividualCustomers[];
  corporateCustomer!:CorporateCustomers[];
  customerId!:number;
  subscription!:Subscription[];
  service!:Service[];
  serviceId!:number[];
  filteredService!:Service[];


  constructor(
    private individualCustomerService:IndividualCustomersService,
    private corporateCustomerService:CorporateCustomersService,
    private route:ActivatedRoute,
    private subscriptionsService:SubscriptionsService,
    private servicesService:ServicesService
    ) { }

  ngOnInit(): void {
    this.customerId = Number(this.route.snapshot.paramMap.get('id'));
    this.getSubscriptions();
    this.getCustomer();
  }
  getCustomer(){
    this.individualCustomerService.getCustomerDetail(this.customerId).subscribe((res)=> {
      this.individualCustomer = res;
      console.log(this.individualCustomer);

    });
    this.corporateCustomerService.getCustomerDetail(this.customerId).subscribe((res) =>
    {
      this.corporateCustomer = res;
      console.log(this.corporateCustomer);

    })
}

  getSubscriptions(){
    this.subscriptionsService.getSubscription(this.customerId).subscribe({
      next: (res) => {
        this.subscription = res;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.getServices();
      },
    });
  }
  getServices(){
    this.servicesService.getServices().subscribe({
      next: (res) => {
        this.service = res;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.serviceId = this.subscription.map(sub => sub.serviceId);
        console.log(this.serviceId);

        this.filteredService = this.service.filter(item => this.serviceId.includes(item.id));
        console.log(this.filteredService);

      },
    });
  }


}
