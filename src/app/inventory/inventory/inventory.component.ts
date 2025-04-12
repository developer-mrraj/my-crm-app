import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-inventory',
  imports: [FormsModule,ReactiveFormsModule, CommonModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {


  inventoryForm = new FormGroup({
    productCode: new FormControl(""),
    productName: new FormControl(""),
    quantity: new FormControl<number | null>(null),
    price: new FormControl<number | null>(null),
    categoryId: new FormControl<number | null>(null),
    productSize: new FormArray<FormControl<string | null>>([]),
    productColor: new FormArray<FormControl<string | null>>([])
  }); 

  constructor(private http: HttpClient) {}

  // Get FormArray controls
  get productSize(): FormArray<FormControl<string | null>> {
    return this.inventoryForm.get('productSize') as FormArray<FormControl<string | null>>;
  }
  
  get productColor(): FormArray<FormControl<string | null>> {
    return this.inventoryForm.get('productColor') as FormArray<FormControl<string | null>>;
  }
  

  // Add size input field
  addProductSize() {
    this.productSize.push(new FormControl(""));
  }

  // Remove size input field
  removeProductSize(index: number) {
    this.productSize.removeAt(index);
  }

  // Add color input field
  addProductColor() {
    this.productColor.push(new FormControl(""));
  }

  // Remove color input field
  removeProductColor(index: number) {
    this.productColor.removeAt(index);
  }

  // Submit Form
  submitInventory() {
    const ProductData = {
      product_code: this.inventoryForm.value.productCode,
      product_name: this.inventoryForm.value.productName,
      quantity: Number(this.inventoryForm.value.quantity),
      product_price: Number(this.inventoryForm.value.price),
      Category_id: Number(this.inventoryForm.value.categoryId),
      size: this.inventoryForm.value.productSize,  // Sending as an array
      color: this.inventoryForm.value.productColor // Sending as an array
    };

    this.http.post("http://localhost:8000/products", ProductData).subscribe(
      (res) => {
        alert('Product added successfully!');
        console.log('Response:', res);
      },
      (error) => {
        console.error('Error:', error);
        alert('Error occurred while adding data.');
      }
    );
  }

  categoriesForm : FormGroup = new FormGroup({
    categoryId : new FormControl<number | null>(null),
    categoryName : new FormControl("")
  })


  // constructor(private http: HttpClient) {}

  addCategrory(){
    const formData = {
      category_id : Number(this.categoriesForm.value.categoryId),
      category_name : this.categoriesForm.value.categoryName,
    }
    this.http.post("http://localhost:8000/categories",formData).subscribe((res:any)=>{
      alert('Category Added successfully');
    },
    (error) => {
      console.error('Error:', error); // Log the error response
      alert('Error creating user');
    })
  }




}
