import { Component, inject, linkedSignal, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ListComponent } from "../../components/list/list.component";
import { CountryService } from '../../services/country.service';
import { Region } from '../../interfaces/region.interface';


function validateQueryParam( queryParam: string): Region {
  queryParam = queryParam.toLowerCase();

  const validRegions: Record<string, Region> = {
    'africa': 'Africa',
    'americas': 'Americas',
    'asia': 'Asia',
    'europe': 'Europe',
    'oceania':'Oceania',
    'antarctic': 'Antarctic',
  };

  return validRegions[queryParam] ?? 'Americas'
}


@Component({
  selector: 'country-by-region-page',
  imports: [ListComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';
  selectedRegion = linkedSignal<Region | null>(() => validateQueryParam(this.queryParam));

  countryService = inject(CountryService);

  countryResource = rxResource({
    request: () => ({ query: this.selectedRegion() }),
    stream: ({ params }: {params: { query: Region | null }}) => {
      if (!params.query) return of([]);
      this.router.navigate(['/country/by-region'], {
        queryParams: {
          region: params.query
        }
      })
      return this.countryService.searchByRegion(params.query);
    }
  });
}
