import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
  selector: 'dragonball-character-list',
  imports: [],
  templateUrl: './character-list.component.html',
})
export class CharacterListComponent {

  characters = input.required<Character[]>();
  listName = input.required<string>();
}
