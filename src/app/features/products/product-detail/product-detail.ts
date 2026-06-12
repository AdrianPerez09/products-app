import {
  Component,
  inject,
  signal
} from '@angular/core';

import {
  ActivatedRoute
} from '@angular/router';

import {
  switchMap
} from 'rxjs';

import { ProductService }
from '../../../services/product/product.service';

import { CommonModule }
from '@angular/common';

@Component({

  selector: 'app-product-detail',

  imports: [CommonModule],

  templateUrl: './product-detail.html',

  styleUrl: './product-detail.css'

})
export class ProductDetailComponent {

  /* ==========================================
     DEPENDENCIES
  ========================================== */

  /**
   * Permite acceder a los parámetros
   * de la URL actual.
   *
   * Ejemplo:
   *
   * /products/15
   *
   * id = 15
   */
  private route =
    inject(ActivatedRoute);

  /**
   * Servicio encargado de realizar
   * las llamadas HTTP relacionadas
   * con productos.
   */
  private productService =
    inject(ProductService);

  /* ==========================================
     STATE
  ========================================== */

  /**
   * Producto actualmente mostrado.
   *
   * Se actualiza automáticamente
   * cuando cambia el id de la URL.
   */
  product =
    signal<any>(null);

  /**
   * Imagen principal seleccionada
   * dentro de la galería.
   */
  selectedImage =
    signal('');

  /* ==========================================
     CONSTRUCTOR
  ========================================== */

  constructor() {

    /**
     * Escuchamos los cambios
     * en los parámetros de la ruta.
     *
     * Esto es importante porque Angular
     * reutiliza el mismo componente
     * cuando navegamos entre:
     *
     * /products/15
     *
     * y
     *
     * /products/27
     *
     * El constructor NO se vuelve
     * a ejecutar.
     *
     * Por eso debemos reaccionar
     * a los cambios del parámetro id.
     */
    this.route.paramMap

      .pipe(

        /**
         * Cuando cambia el parámetro id,
         * cancelamos la petición anterior
         * y cargamos el nuevo producto.
         *
         * Ejemplo:
         *
         * /products/15
         * ↓
         * /products/27
         *
         * Angular cancela la petición
         * anterior y solicita únicamente
         * el producto 27.
         */
        switchMap(params =>

          this.productService
            .getProductById(

              Number(
                params.get('id')
              )

            )

        )

      )

      .subscribe(product => {

        /**
         * Guardamos el producto recibido
         * en una Signal para mostrarlo
         * en la plantilla.
         */
        this.product.set(product);

        /**
         * Buscamos la imagen marcada
         * como miniatura principal.
         */
        const thumbnail =

          product.images.find(

            image => image.thumbnail

          );

        /**
         * Seleccionamos la imagen inicial.
         *
         * Prioridad:
         *
         * 1. Thumbnail
         * 2. Primera imagen disponible
         * 3. Cadena vacía
         */
        this.selectedImage.set(

          thumbnail?.imageUrl ??

          product.images[0]?.imageUrl ??

          ''

        );

      });

  }

}