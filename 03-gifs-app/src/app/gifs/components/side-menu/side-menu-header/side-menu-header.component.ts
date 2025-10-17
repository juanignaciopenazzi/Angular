import { Component, Input } from '@angular/core';
import { environment } from '@environments/environment';

interface User {
  name: string;
  avatar: string;
}

@Component({
  selector: 'gifs-side-menu-header',
  imports: [],
templateUrl: './side-menu-header.component.html',
})
export class SideMenuHeaderComponent {
  envs = environment;

  @Input() user: User = {
    name: 'Juan Ignacio Penazzi',
    avatar: 'https://cdn-icons-png.freepik.com/512/3177/3177440.png'
  }
}
