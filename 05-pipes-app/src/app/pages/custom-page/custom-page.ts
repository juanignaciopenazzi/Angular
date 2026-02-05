import { Component, effect, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

import { heroes } from '../../data/heroes.data';
import { ToggleCasePipe } from '@pipes/toggle-case.pipe';
import { CanFLyPipe } from '@pipes/can-fly.pipe';
import { HeroColorPipe } from '@pipes/hero-color.pipe';
import { HeroTextColorPipe } from '@pipes/hero-text-color.pipe';
import { HeroCreatorPipe } from '@pipes/hero-creator.pipe';
import { HeroSortByPipe } from '@pipes/hero-sort-by.pipe';
import { Hero } from '@interfaces/hero.interface';
import { HeroFilterPipe } from '@pipes/hero-filte.pipe';

@Component({
  selector: 'app-custom-page',
  imports: [
    TitleCasePipe,
    ToggleCasePipe,
    CanFLyPipe,
    HeroColorPipe,
    HeroTextColorPipe,
    HeroCreatorPipe,
    HeroSortByPipe,
    HeroFilterPipe
  ],
  templateUrl: './custom-page.html',
})
export default class CustomPage {

  name = signal('Juan Ignacio Penazzi')
  upperCase = signal(true);
  heroes = signal(heroes)
  sortBy = signal<keyof Hero | null>(null);

  searchQuery = signal('')

  changeValue(value: boolean) {
    this.upperCase.set( value )
  }
}
