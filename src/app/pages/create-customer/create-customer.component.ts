import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CorporateCustomers } from 'src/app/models/corporateCustomers';
import { CorporateCustomersService } from 'src/app/services/corporate-customers.service';
import { IndividualCustomers } from 'src/app/models/individualCustomers';
import { IndividualCustomersService } from 'src/app/services/individual-customers.service';
import { Service } from 'src/app/models/service';
import { ServicesService } from 'src/app/services/services.service';
import { ToastrMessageService } from 'src/app/services/toastr-message.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  createIndividualCustomer!: FormGroup;
  createCorporateCustomer!: FormGroup;
  servicesForm:boolean = false;
  isChecked:boolean = true;
  title:string = "Select Customer Type";
  services!: Service[];
  serviceForm!: FormGroup;
  stepCount:number = 0;
  checkedServices!:any[];

  constructor(
    private formBuilder:FormBuilder,
    private individualCustomerService:IndividualCustomersService,
    private corporateCustomerService:CorporateCustomersService,
    private servicesService:ServicesService,
    private toastrService:ToastrMessageService
    ) {
      this.serviceForm = formBuilder.group({
        selectedServices:  new FormArray([])
       });
     }

  ngOnInit(): void {
    this.createIndividualCustomerForm();
    this.createCorporateCustomerForm();
    this.getServices();

  }

  createIndividualCustomerForm(){
    this.createIndividualCustomer = this.formBuilder.group({
      customerId: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nationalIdentity: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      dateOfBirth:['',Validators.required]
    });
  }

  createCorporateCustomerForm(){
    this.createCorporateCustomer = this.formBuilder.group({
      customerId: ['', Validators.required],
      companyName: ['', Validators.required],
      taxNumber: ['', [Validators.required,Validators.minLength(8)]]
    });
  }

  clickCustomerOption(selectedChoice:boolean) {
    this.isChecked = selectedChoice;

  }

  goNextForm(){
    if(this.isChecked && this.stepCount === 0 ){
      this.servicesForm = true;
      this.title = "Select Services";
      //this.store.dispatch(this.createIndividualCustomer.value);
      this.saveIndividualStore(this.createIndividualCustomer.value);
      //console.log(this.createIndividualCustomer.value);
      this.stepCount++;

    }else if(!this.isChecked && this.stepCount === 0){
      this.servicesForm = true;
      this.title = "Services";
      //this.store.dispatch(this.createIndividualCustomer.value);
      this.saveCorporateStore(this.createCorporateCustomer.value);
      this.stepCount++;
    }else if(this.stepCount === 1){
      //Todo : store 'a service kaydını yap
      //özet sayfası gösterilecek
      this.title = "Summary"
      this.saveServicesStore(this.serviceForm.value);
      this.stepCount++;
    }else{
      this.toastrService.error("Form alanı zorunludur","Sistem Mesajı :")
    }

  }

  getServices() {
    this.servicesService.getServices().subscribe((response) => {
      this.services = response;
   })
  }

  onCheckboxChange(event: any) {

    const selectedServices = (this.serviceForm.controls['selectedServices'] as FormArray);

    if (event.target.checked) {
      selectedServices.push(new FormControl(event.target.value));
    } else {
      const index = selectedServices.controls
      .findIndex(x => x.value === event.target.value);
      selectedServices.removeAt(index);
    }
  }

  saveIndividualStore(customer:IndividualCustomers){
    this.individualCustomerService.saveIndividualCustomer(customer);
    this.individualCustomerService.individualCustomerModel$.subscribe((res) => {
      console.log("individual :" , res);
    });
  }

  saveCorporateStore(customer:CorporateCustomers){
    this.corporateCustomerService.saveCorporateCustomer(customer);
    this.corporateCustomerService.CorporateCustomerModel$.subscribe((res) => {
      console.log("corporate :",res);
    });
  }

  saveServicesStore(services:Service){
    this.servicesService.saveServices(services);
    this.servicesService.serviceModel$.subscribe((res) => {
      console.log("services :",res);
    })
  }


  saveCustomer(){
    
  }

}
