import { Routes } from "@angular/router";
import { BasicPage } from "../reactive/pages/basic-page/basic-page";
import { DinamicPage } from "./pages/dinamic-page/dinamic-page";
import { SwitchesPage } from "./pages/switches-page/switches-page";

export const reactiveRoutes: Routes = [

  {
    path: '',
    children: [
      {
        path: 'basic',
        title: 'Básicos',
        component: BasicPage,
      },
      {
        path: 'dinamic',
        title: 'Dinámicos',
        component: DinamicPage,
      },
      {
        path: 'switches',
        title: 'Switches',
        component: SwitchesPage,
      },
      {
        path: '**',
        redirectTo: 'basic'
      },
    ],
  },
];
