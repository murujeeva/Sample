import { Component, OnInit } from '@angular/core';

import { Customer } from '../model/customer';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})

export class CustomersComponent implements OnInit {
  customers: Customer[] = [];

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(): void {
    this.customerService.getCustomers()
    .subscribe(customers => this.customers = customers);
  }

  // getCustomer(id: number): void {
  //   this.customerService.getCustomer(id)
  //   .subscribe(customers => this.customers = customers);
  // }

  add(name: string, phoneNumber:string, city:string, state:string, pincode:string): void {
    var customerName = name.trim();
    if (!name) { return; }
    this.customerService.addCustomer({customerName, phoneNumber, city, state, pincode } as Customer)
      .subscribe(customer => {
        this.customers.push(customer);
      });
  }

  delete(customer: Customer): void {
    this.customers = this.customers.filter(h => h !== customer);
    this.customerService.deleteCustomer(customer.customerId).subscribe();
  }

}
