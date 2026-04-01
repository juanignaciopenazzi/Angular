import { AfterViewInit, Component, ElementRef, input, signal, viewChild } from '@angular/core';
import { LngLat } from '../../../interfaces/house.interface';
import { environment } from '../../../../environments/environment';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-minimap',
  imports: [],
  templateUrl: './minimap.html',
  styles: `
    div {
      width: 100%;
      height: 260px;
    }
  `,
})
export class Minimap implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  lngLat = input.required<LngLat>();
  zoom = input<number>(14);
  map = signal<mapboxgl.Map | null>(null);

  ngAfterViewInit() {
    const elementRef = this.divElement();
    if (!elementRef) return;

    const map = new mapboxgl.Map({
      container: elementRef.nativeElement,
      center: this.lngLat(),
      zoom: this.zoom(),
      interactive: false,
    });

    new mapboxgl.Marker().setLngLat(this.lngLat()).addTo(map);
  }
}
