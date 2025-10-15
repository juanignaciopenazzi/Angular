import { Component, inject, signal } from '@angular/core';
import { CharacterListComponent } from "../../components/dragonnball/character-list/character-list.component";
import { CharacterAddComponent } from "../../components/dragonnball/character-add/character-add.component";
import { DragonballService } from '../../services/dragonball.service';


@Component({
  selector:'dragonball-super',
  templateUrl: './dragonball-super-page.html',
  imports: [CharacterListComponent, CharacterAddComponent],
})
export class DragonballSuperPage {

  // Inyeccion de dependencias tradicional
  // constructor(
  //   public dragonballService: DragonballService
  // ) {}

  // Nueva forma => Tomar la instancia de la clase
  public dragonballService = inject(DragonballService)
}
