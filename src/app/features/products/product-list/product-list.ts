import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { toSignal } from '@angular/core/rxjs-interop';

// Permite acceder a los parámetros de la URL.
// Ejemplo:
// /products/category/3
//                ↑
//                id = 3
import { ActivatedRoute } from '@angular/router';

// Operador RxJS que permite cambiar de Observable
// cuando cambia el parámetro de la ruta.
import { switchMap } from 'rxjs';

import { ProductService } from '../../../services/product/product.service';

@Component({

  selector: 'app-product-list',

  standalone: true,

  imports: [CommonModule],

  templateUrl: './product-list.html',

  styleUrl: './product-list.css',

})
export class ProductListComponent {

  // Inyectamos el servicio de productos.
  // Nos permite llamar a:
  // getAllProducts()
  // getProductsByCategory(...)
  private productService = inject(ProductService);

  // Inyectamos la ruta actual.
  // Desde aquí podremos leer el parámetro "id".
  private route = inject(ActivatedRoute);

  // Creamos una Signal que contendrá la lista
  // de productos a mostrar.
  products = toSignal(

    // Escuchamos cambios en la URL.
    // Si el usuario navega de:
    //
    // /products/category/1
    //
    // a
    //
    // /products/category/2
    //
    // este observable se vuelve a ejecutar.
    this.route.paramMap.pipe(

      switchMap(params => {

        // Obtenemos el parámetro "id"
        // de la URL.
        //
        // /products/category/3
        //
        // devuelve:
        //
        // "3"
        const categoryId =
          Number(params.get('id'));

        // Si existe un id válido...
        if (categoryId) {

          // Llamamos al backend para obtener
          // únicamente los productos
          // de esa categoría.
          return this.productService
            .getProductsByCategory(
              categoryId
            );

        }

        // Si NO existe id
        //
        // Ejemplo:
        //
        // /products
        //
        // mostramos todos los productos.
        return this.productService
          .getAllProducts();

      })

    ),

    // Valor inicial mientras se realiza
    // la petición HTTP.
    {
      initialValue: []
    }

  );

}