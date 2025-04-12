import { Component, OnInit, signal  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime,distinctUntilChanged } from 'rxjs/operators';

// Defines the structure of a bill object with three properties
interface Bill {
  bill_id: string;
  current_date: string;
  payment_method: string;
}

interface Customer{
  name : string;
  mobile_number : number;
  email : string;
  address : string;
}


@Component({
  selector: 'app-billing',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.css'
})
export class BillingComponent implements OnInit {
  billList = signal<Bill[]>([]);
    selectedPaymentMethod: string = '';
    paymentMethods = ['Cash', 'UPI', 'Credit/Debit Card'];
    customerForm: FormGroup;
    selectedCustomerId: number | null = null; // Make sure it's bound to the input field
    isCustomerExists: boolean = false;   // Flag to check existing customer
    useExistingCustomer: boolean = false;
    existingCustomer: any = {}; 
  
    constructor(private http: HttpClient) {
      this.customerForm = new FormGroup({
        cust_name: new FormControl(''),
        cust_mobileNumber: new FormControl<number | null>(null),
        cust_email: new FormControl(''),
        cust_address: new FormControl(''),
        items: new FormArray<FormGroup>([])  // Use FormArray for multiple items
      });
    }
  
    
  
    ngOnInit() {
      this.fetchBillData();
      this.addItem();

      this.customerForm.valueChanges.subscribe(() => {
        // this.calculateTotal();
      });

      const mobileControl = this.customerForm.get('cust_mobileNumber');
      const emailControl = this.customerForm.get('cust_email');
    
      if (mobileControl && emailControl) {
        mobileControl.valueChanges
          .pipe(distinctUntilChanged())
    
        emailControl.valueChanges
          .pipe(debounceTime(5000), distinctUntilChanged())
          .subscribe(() => this.checkCustomerExists());
      }
    }
    
  
    // Fetch Bill Data from Backend
    // Uses the set method of Angular's signal to update the state
    // [response]-in this it converts it into array
    fetchBillData() {
      this.http.get<Bill[]>('http://localhost:8000/get-new-bill-id').subscribe({
        next: (response) => {
          this.billList.set(Array.isArray(response) ? response : [response]);
        },
        error: (error) => {
          console.error('Error fetching bill data:', error);
        },
      });
    }
  
    // Capture Selected Payment Method
    selectPaymentMethod(method: string) {
      this.selectedPaymentMethod = method;
    }
  
    onCustomerSelect(customer: any) {
      this.selectedCustomerId = customer.id;
      console.log("Selected Customer ID:", this.selectedCustomerId);  // Debugging
    }


    checkCustomerExists() {
        const email = this.customerForm.get('cust_email')?.value;
        const mobileNumber = this.customerForm.get('cust_mobileNumber')?.value;
    
        if (email || mobileNumber) {
          this.http.get<any>(`http://localhost:8000/check-customer/?email=${email}&mobile_number=${mobileNumber}`)
            .subscribe({
              next: (response) => {
                this.isCustomerExists = !!response;
                this.useExistingCustomer = this.isCustomerExists;
                this.existingCustomer = this.isCustomerExists ? response : {};
    
                // Auto-fill form if a matching customer is found
                if (this.isCustomerExists) {
                  this.customerForm.patchValue({
                    cust_name: this.existingCustomer.name,
                    cust_mobileNumber: this.existingCustomer.mobile_number,
                    cust_email: this.existingCustomer.email,
                    cust_address: this.existingCustomer.address
                  });
                }
              },
              error: (error) => {
                console.error('Error checking customer:', error);
              }
            });
        }// 1-second delay
    }

    get items(): FormArray<FormGroup> {
      return this.customerForm.get('items') as FormArray<FormGroup>;
    }
    
    addItem() {
      const item = new FormGroup({
        name: new FormControl(''),
        quantity: new FormControl<number | null>(null),
        price: new FormControl<number | null>(null),
        discount: new FormControl<number | null>(null),
        total: new FormControl<number | null>(null),
      });
    
      item.valueChanges.subscribe(() => this.calculateTotal(item));
      this.items.push(item);
    }
    
    removeItem(index: number) {
      this.items.removeAt(index);
    }
    
    calculateTotal(item: FormGroup) {
      const price = item.get('price')?.value || 0;
      const qty = item.get('quantity')?.value || 0;
      const discount = item.get('discount')?.value || 0;
      const total = (price * qty) - discount;
      item.patchValue({ total }, { emitEvent: false });
    }
    
    
    onUserCreat() {
      const customerData = {
        name: this.customerForm.value.cust_name,
        mobile_number: Number(this.customerForm.value.cust_mobileNumber),
        email: this.customerForm.value.cust_email,
        address: this.customerForm.value.cust_address
      };
  
      const itemData = this.items.value;
  
      const billingData = {
        bill_id: this.billList()[0].bill_id,
        current_date: this.billList()[0].current_date,
        payment_method: this.selectedPaymentMethod
      }
  
      const formData = {
        customer: customerData,
        items: itemData,
        billing: billingData
      };
  
      this.http.post('http://localhost:8000/customers/', formData).subscribe(
        (res) => {
          alert('Customer created successfully!');
          window.location.reload();
        },
        (error) => {
          console.error('Error:', error);
          alert('Error creating customer');
        }
      );
    }

    // calculateTotal(): void {
    //   const quantity = this.customerForm.get('item_quantity')?.value || 0;
    //   const price = this.customerForm.get('item_price')?.value || 0;
    //   const discount = this.customerForm.get('item_discount')?.value || 0;
  
    //   const total = (price * quantity) - discount;
  
    //   // Update the Total field
    //   this.customerForm.patchValue({ item_total: total }, { emitEvent: false });
    // }


    
}
