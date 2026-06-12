import {
  Injectable,
  signal
} from '@angular/core';

@Injectable()
export class KbSuggestionsNavigation {

  readonly selectedIndex =
    signal(-1);

  reset(): void {

    this.selectedIndex.set(-1);

  }

  moveDown(
    totalItems: number
  ): void {

    if (

      this.selectedIndex() <

      totalItems - 1

    ) {

      this.selectedIndex.update(

        value => value + 1

      );

    }

  }

  moveUp(): void {

    if (

      this.selectedIndex() > 0

    ) {

      this.selectedIndex.update(

        value => value - 1

      );

    }

  }

}