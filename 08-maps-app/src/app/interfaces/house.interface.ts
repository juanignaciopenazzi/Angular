export interface HouseProperty {
  id: string;
  name: string;
  description: string;
  price: number;
  lngLat: LngLat;
  tags: string[];
}

export interface LngLat {
  lng: number;
  lat: number
}
