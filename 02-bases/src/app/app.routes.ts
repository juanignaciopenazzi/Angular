import { Routes } from '@angular/router';
import { CounterComponent } from './pages/counter/counter.component';
import { HeroPageComponent } from './pages/hero/hero-page.component';
import { DragonballPage } from './pages/dragonball/dragonball-page';
import { DragonballSuperPage } from './pages/dragonball-super/dragonball-super-page.component';

export const routes: Routes = [
  {
    path: '',
    component: CounterComponent
  },
  {
    path:'hero',
    component: HeroPageComponent
  },
  {
    path: 'dragonball',
    component: DragonballPage
  },
  {
    path: 'dragonball-super',
    component:  DragonballSuperPage
  },
  {
    path: '**',
    redirectTo: ''
  }
];
