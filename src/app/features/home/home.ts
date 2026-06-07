import {
  Component,
  DestroyRef,
  inject,
  signal
} from '@angular/core';

import { RouterLink } from '@angular/router';

import { interval } from 'rxjs';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

  private destroyRef = inject(
    DestroyRef
  );

  currentSlide = signal(0);

  readonly slides: Slide[] = [

    {
      title: 'C Gaming Series',
      description:
        'Best prebuilt pc setups of the world',
      image: '/images/sliders/home-main/1.png',
      route: '/products',
      align: 'right'
    },

    {
      title: 'We think on you',
      description:
        'Our technicians work hard to deliver performance every day',
      image: '/images/sliders/home-main/2.png',
      route: '/products',
      align: 'left'
    }
    ,
    {
      title: '',
      description:
        '',
      image: '/images/sliders/home-main/3.png',
      route: '/products',
      align: 'right'
    }

  ];

  constructor() {

    interval(6000)

      .pipe(
        takeUntilDestroyed(
          this.destroyRef
        )
      )

      .subscribe(() => {

        this.nextSlide();

      });

  }

  nextSlide(): void {

    this.currentSlide.update(
      value =>
        (value + 1) %
        this.slides.length
    );

  }

  previousSlide(): void {

    this.currentSlide.update(
      value =>
        value === 0
          ? this.slides.length - 1
          : value - 1
    );

  }

  goToSlide(index: number): void {

    this.currentSlide.set(index);

  }

}