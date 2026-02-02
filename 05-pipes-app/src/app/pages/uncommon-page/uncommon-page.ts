import { Component, signal } from '@angular/core';
import { Card } from "../../components/card/card";
import { AsyncPipe, I18nPluralPipe, I18nSelectPipe, JsonPipe, KeyValuePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { interval, map, tap } from 'rxjs';

const client1 = {
  name: 'Fernando',
  gender: 'male',
  age: 39,
  address: 'Otawwa, Canadá'
}

const client2 = {
  name: 'Fernanda',
  gender: 'female',
  age: 39,
  address: 'Toronto, Canadá'
}


@Component({
  selector: 'app-uncommon-page',
  imports: [Card,
    I18nSelectPipe,
    I18nPluralPipe,
    SlicePipe,
    JsonPipe,
    UpperCasePipe,
    KeyValuePipe,
    TitleCasePipe,
    AsyncPipe,
  ],
  templateUrl: './uncommon-page.html',
})
export default class UncommonPage {

  // i18nSelect
  client = signal(client1);

  invitacionMap = {
    male: 'invitarlo',
    female: 'invitarla',
  }

  changeClient() {
    if ( this.client() == client1 ) {
      this.client.set(client2);
      return;
    }
    this.client.set(client1);
  };

  // i18nPlural
  clientsMap = signal({
    '=0': 'no tenemos ningún cliente esperando',
    '=1': 'tenemos 1 cliente esperando',
    other: 'tenemos # clientes esperando',
  })


  clients = signal([
    'Maria',
    'Pedro',
    'Fernando',
    'Melissa',
    'Natalia',
    'Andrea',
    'Juan',
    'Carlos'
  ])

  deleteClient() {
    this.clients.update( prev => prev.slice(1))
  }

  // KeyValue Pipe
  profile = {
    name: 'Fernando',
    age: 36,
    address: 'Ottawa, Cánada'
  }

  // Async Pipe
  promiseValue: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Tenemos data en la promesa.');
    }, 3500);
  });

  myObservableTimer = interval(2000)
  .pipe(
    map( (value) => value + 1),
    tap( (value) => console.log('tap', value))
  );

}
