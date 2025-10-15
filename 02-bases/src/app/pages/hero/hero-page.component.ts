import { UpperCasePipe } from "@angular/common";
import { Component, computed, signal } from "@angular/core";

@Component({
  templateUrl: './hero-page.component.html',
  imports: [UpperCasePipe]
})

export class HeroPageComponent {
  name = signal('Ironman');
  age = signal(45);

  heroDesciption = computed( () => {
    return `Nombre: ${this.name()} - Edad: ${this.age()}`;
  })

  capitalizedName  = computed( () => this.name().toUpperCase())

  // getHeroDescription() {
  //   return `Nombre: ${this.name()} - Edad: ${this.age()}`
  // }

  changeHero() {
    this.name.set('Spiderman')
    this.age.set(22)
  }

  changeAge() {
    this.age.set(60)
  }

  resetForm() {
    this.name.set('Ironman')
    this.age.set(45)
  }

}
