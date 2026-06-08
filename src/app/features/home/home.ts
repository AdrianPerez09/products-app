import {
  Component,
  DestroyRef,
  inject,
  signal
} from '@angular/core';

import {
  RouterLink
} from '@angular/router';

import {
  interval,
  Subscription
} from 'rxjs';

import {
  takeUntilDestroyed
} from '@angular/core/rxjs-interop';

/**
 * Modelo de una diapositiva del hero.
 */
interface Slide {

  title: string;

  description: string;

  image: string;

  route: string;

  align: 'left' | 'right';

}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {

  /**
   * Referencia utilizada para destruir
   * automáticamente observables al salir
   * del componente.
   */
  private destroyRef = inject(
    DestroyRef
  );

  /**
   * Referencia al temporizador automático
   * del carrusel.
   */
  private autoSlideSubscription?: Subscription;

  /**
   * Índice de la diapositiva actual.
   */
  currentSlide = signal(0);

  /**
   * Datos del carrusel principal.
   */
  readonly slides: Slide[] = [

    {
      title: 'C Gaming Series',

      description:
        'Best prebuilt pc setups of the world',

      image:
        '/images/sliders/home-main/1.png',

      route: '/products',

      align: 'right'
    },

    {
      title: 'We think on you',

      description:
        'Our technicians work hard to deliver performance every day',

      image:
        '/images/sliders/home-main/2.png',

      route: '/products',

      align: 'left'
    },

    {
      title: '',

      description: '',

      image:
        '/images/sliders/home-main/3.png',

      route: '/products',

      align: 'right'
    }

  ];

  /**
   * Al crear el componente iniciamos
   * el carrusel automático.
   */
  constructor() {

    this.startAutoSlide();

  }

  /* ==========================================
     AUTO SLIDE
  ========================================== */

  /**
   * Inicia el cambio automático
   * de diapositivas cada 6 segundos.
   *
   * Si ya existe un temporizador,
   * se elimina antes de crear uno nuevo.
   */
  private startAutoSlide(): void {

    this.autoSlideSubscription?.unsubscribe();

    this.autoSlideSubscription = interval(6000)

      .pipe(
        takeUntilDestroyed(
          this.destroyRef
        )
      )

      .subscribe(() => {

        /**
         * false indica que el cambio
         * ha sido automático y NO debe
         * reiniciar el temporizador.
         */
        this.nextSlide(false);

      });

  }

  /**
   * Reinicia el contador del carrusel.
   *
   * Se ejecutará cuando el usuario
   * pulse siguiente, anterior o un indicador.
   */
  private resetAutoSlide(): void {

    this.startAutoSlide();

  }

  /* ==========================================
     NAVIGATION
  ========================================== */

  /**
   * Avanza a la siguiente diapositiva.
   *
   * @param userInteraction
   * true -> acción del usuario
   * false -> cambio automático
   */
  nextSlide(
    userInteraction = true
  ): void {

    this.currentSlide.update(

      value =>

        (value + 1) %

        this.slides.length

    );

    if (userInteraction) {

      this.resetAutoSlide();

    }

  }

  /**
   * Retrocede a la diapositiva anterior.
   */
  previousSlide(): void {

    this.currentSlide.update(

      value =>

        value === 0

          ? this.slides.length - 1

          : value - 1

    );

    this.resetAutoSlide();

  }

  /**
   * Navega directamente
   * a una diapositiva concreta.
   */
  goToSlide(
    index: number
  ): void {

    this.currentSlide.set(index);

    this.resetAutoSlide();

  }

}