import { ChangeDetectionStrategy, Component, signal } from "@angular/core";

@Component({
  templateUrl: './counter.component.html',
  styleUrls: [ './counter.component.css' ],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent {
  counter = 0;
  counterSignal = signal(0);

  increaseBy( value: number ) {
    this.counter += value;
    // this.counterSignal.set( this.counterSignal + value )
    this.counterSignal.update( (current) => current + value);
  }

  resetCounter() {
    this.counter = 0;
    this.counterSignal.set(0);
  }
}
