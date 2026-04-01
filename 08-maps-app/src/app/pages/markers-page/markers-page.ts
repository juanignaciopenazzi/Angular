import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import { v4 as UUID4 } from 'uuid';

mapboxgl.accessToken = environment.mapboxKey;

interface Marker {
  id: string;
  mapboxMarker: mapboxgl.Marker;
}

@Component({
  selector: 'app-markers-page',
  templateUrl: './markers-page.html',
})
export class MarkersPage implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);
  markers = signal<Marker[]>([]);

  ngAfterViewInit() {
    const elementRef = this.divElement();
    if (!elementRef) return;

    const map = new mapboxgl.Map({
      container: elementRef.nativeElement,
      center: [-64.1932, -31.4425],
      zoom: 14,
    });

    // const marker = new mapboxgl.Marker({
    //   draggable: false,
    //   color: 'red',
    // })
    //   .setLngLat([-64.1932, -31.4425])
    //   .addTo(map);

    // marker.on('dragend', (event) => {
    //   console.log(event);
    // });

    this.mapListeners(map);
  }

  mapListeners(map: mapboxgl.Map) {
    map.on('click', (event) => {
      this.mapClick(event);
    });

    this.map.set(map);
  }

  mapClick(event: mapboxgl.MapMouseEvent) {
    if (!this.map()) return;

    const color = '#xxxxxx'.replace(/x/g, (y) => ((Math.random() * 16) | 0).toString(16));
    const coords = event.lngLat;
    const map = this.map()!;

    const marker = new mapboxgl.Marker({
      color: color,
    })
      .setLngLat(coords)
      .addTo(map);

    const newMarker: Marker = {
      id: UUID4(),
      mapboxMarker: marker,
    };

    this.markers.set([newMarker, ...this.markers()]);
  }

  flyToMarker(lngLat: LngLatLike, markerId?: string) {
    if (!this.map()) return;

    this.map()?.flyTo({
      center: lngLat,
    });
  }

  deleteMarker(marker: Marker) {
    if (!this.map()) return;
    const map = this.map()!;

    marker.mapboxMarker.remove();
    this.markers.set(this.markers().filter((m) => m.id != marker.id));
  }
}
