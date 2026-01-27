import { Component, inject, resource, signal } from '@angular/core';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { ListComponent } from "../../components/list/list.component";
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'country-by-capital-page',
  imports: [SearchInputComponent, ListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  countryService = inject(CountryService);
  query = signal('')

  // # rxResource
  // countryResource = rxResource({
  //   request: () =>  ({ query: this.query() }),
  //   loader: ({ request }: {request: { query: string }}) => {
  //     if (!request.query) return of([]);

  //     return this.countryService.searchByCapital(request.query);
  //   }
  // });


  // # Usar resource() -> menos codigo y mas limpio
  // # Trabaja con promesas en vez de observables
  countryResource = resource({
    request: () => ({ query: this.query() }),
    loader: async({ params }) => {
      if( !params.query ) return [];

      return await firstValueFrom(
        this.countryService.searchByCapital(params.query)
      );
    },
  });

  // # Forma tradicional mas larga de hacer la peticion
  // -->
  // isLoading = signal(false);
  // isError = signal<string | null>(null);
  // countries = signal<Country[]>([]);

  // onSearch( query: string ) {
  //   if ( this.isLoading() ) return;

  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryService.searchByCapital(query)
  //     .subscribe({
  //       next: (resp) => {
  //         this.isLoading.set(false);
  //         this.countries.set(resp);
  //       },
  //       error: (err) => {
  //         this.isLoading.set(false);
  //         this.countries.set([]);
  //         this.isError.set(err)
  //       }
  //     })
  // }



}
