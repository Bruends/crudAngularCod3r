import { ProductService } from './../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {

  product: Product = {name: '', price: null};

  constructor(
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if(id === null) return

    this.productService.readById(id)
      .subscribe(product => {
        this.product = product;
      })
    
  }

  deleteProduct(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if(id === null) return

    this.productService.delete(id)
      .subscribe(() => {        
        this.productService.showMessage("Deletado com sucesso !");
        this.router.navigate(['/products']);
      });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }

}
