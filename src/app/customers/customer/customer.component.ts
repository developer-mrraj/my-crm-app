import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-customer',
  imports: [FormsModule,CommonModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  chartData: any = {
    'New Customers': { number: 120, label: 'New Customers', percentage: '+15%', change: 'increase' },
    'Repeated Customers': { number: 85, label: 'Repeated Customers', percentage: '+10%', change: 'increase' },
    'Total Customers': { number: 205, label: 'Total Customers', percentage: '+12%', change: 'growth' },
    'Total Revenue': { number: '$50,000', label: 'Total Revenue', percentage: '+18%', change: 'growth' }
  };

  visibleCharts: string[] = ['New Customers', 'Repeated Customers', 'Total Customers']; // Default 3 charts

  selectCategory(category: string) {
    if (!this.visibleCharts.includes(category)) {
      if (this.visibleCharts.length >= 3) {
        this.visibleCharts.shift(); // Remove the oldest entry
      }
      this.visibleCharts.push(category); // Add the new selection
    }
  }

  CustomeObj : any = {
      "name": "",
      "mobile_number": 0,
      "email": "",
      "product_name": "",
      "price": 0,
      "address": "" 
  }

  

  CustomerArray : any[] = [];
  searchName: string = '';
  searchId: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  // Fetch customers with optional filtering
  getCustomers() {
    let params = new HttpParams();
    if (this.searchName) {
      params = params.set('name', this.searchName.toString());
    }
    if (this.searchId) {
      params = params.set('user_id', this.searchId);
    }

    this.http.get("http://localhost:8000/get", { params }).subscribe((res: any) => {
      this.CustomerArray = res;
    });
  }

  // Filter customers by Name and ID
  filterCustomers() {
    this.getCustomers(); // Re-fetch data with filters
  }

  // Reset Filters
  resetFilters() {
    this.searchName = '';
    this.searchId = '';
    this.getCustomers();
  }
  addCustomer(customerForm:any){
    this.http.post("http://localhost:8000/customers/add",this.CustomeObj).subscribe((res:any)=>{
      if(res){
        alert('customer created successfully')
        this.getCustomers()
      }else{
        alert('customer not created successfully')
      }

      customerForm.reset();
    })
  }



  deleteCustomer(id:number){
    this.http.delete("http://localhost:8000/customers/delete/" + id).subscribe((res:any)=>{
      if(res){
        alert('customer deleted successfully')
        this.getCustomers()
      }else{
        alert('customer not deleted successfully')
      }
    })
  }
}
