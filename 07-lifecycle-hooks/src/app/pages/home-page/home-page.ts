import { afterEveryRender, afterNextRender, Component, effect, signal } from '@angular/core';
import { Title } from '../../components/title/title';

const log = (...messages: string[]) => {
  console.log(`${messages[0]} %c ${messages.slice(1).join(', ')}`, 'color: #baba55');
};

@Component({
  selector: 'app-home-page',
  imports: [Title],
  templateUrl: './home-page.html',
})
export class HomePage {
  traditionalProperty = 'Juan';
  signalProperty = signal('Juan');

  constructor() {
    log('Constructor llamado');
  }

  changeTraditional() {
    this.traditionalProperty = 'Juan Penazzi';
  }

  changeSignal() {
    this.signalProperty.set('Juan Penazzi');
  }

  basicEffect = effect((onCleanUp) => {
    log('effect', 'Disparar efectos secundarios.');
    onCleanUp(() => {
      log('onCleanUp', 'Se ejecuta cuando el efecto va a ser destruido.');
    });
  });

  // Runs once after Angular has initialized all the component's inputs.
  ngOnInit() {
    log('ngOnInit', "Runs once after Angular has initialized all the component's inputs.");
  }
  // Runs every time the component's inputs have changed.
  ngOnChanges() {
    console.log('ngOnCHanges', "Runs every time the component's inputs have changed.");
  }
  // Runs every time this component is checked for changes.
  ngDoCheck() {
    log('ngDoCheck', 'Runs every time this component is checked for changes.');
  }
  // Runs once after the component's content has been initialized.
  ngAfterContentInit() {
    log('ngAferContentInit', "Runs once after the component's content has been initialized.");
  }
  // Runs every time this component content has been checked for changes.
  ngAfterContentChecked() {
    log(
      'ngAfterContentChecked',
      'Runs every time this component content has been checked for changes.',
    );
  }
  // Runs once after the component's view has been initialized.
  ngAfterViewInit() {
    log('ngAfterViewInit', "Runs once after the component's view has been initialized.");
  }
  // Runs every time the component's view has been checked for changes.
  ngAfterViewChecked() {
    log('ngAfterViewChecked', "Runs every time the component's view has been checked for changes.");
  }

  // Runs once before the component is destroyed.
  ngOnDestroy() {
    log('ngOnDestroy', 'Runs once before the component is destroyed.');
  }

  // Runs once the next time that all components have been rendered to the DOM.
  afterNextRenderEffect = afterNextRender(() => {
    log(
      'afterNextRender',
      'Runs once the next time that all components have been rendered to the DOM.',
    );
  });

  // Runs every time all components have been rendered to the DOM.
  afterEvertyRender = afterEveryRender(() => {
    log('afterEveryRender', 'Runs every time all components have been rendered to the DOM.');
  });
}
