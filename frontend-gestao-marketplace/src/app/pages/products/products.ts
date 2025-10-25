import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products';
import { take } from 'rxjs';
import { IProductResponse } from '../../interfaces/product-response';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [ReactiveFormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  products: IProductResponse[] = [];
  filteredProducts: IProductResponse[] = [];

  filterForm = new FormGroup({
    title: new FormControl(''),
    status: new FormControl(''),
  });

  private readonly _productsService = inject(ProductsService);

  ngOnInit() {
    this._productsService
      .getProducts()
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.products = response.data;
          this.filteredProducts = this.products;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  filterProducts() {
    const title = this.filterForm.value.title?.toLocaleLowerCase();
    const status = this.filterForm.value.status?.toLocaleLowerCase();

    this.filteredProducts = this.products.filter((product) => {
      return (
        (!title || product.title.toLocaleLowerCase().includes(title)) &&
        (!status || product.status.toLocaleLowerCase().includes(status))
      );
    });
  }

  clearFilter() {
    this.filterForm.reset();
    this.filterForm.get('status')?.setValue('');
    this.filteredProducts = this.products;
  }
}
