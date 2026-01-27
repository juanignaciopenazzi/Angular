import { Component, inject, resource, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { ListComponent } from "../../components/list/list.component";
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'country-by-country-page',
  imports: [SearchInputComponent, ListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {

  countryService = inject(CountryService);
  query = signal('');

  countryResource = resource({
    request: () => ({ query: this.query() }),
    loader: async({ params }) => {
      if( !params.query ) return [];

      return await firstValueFrom(
        this.countryService.searchByCountry(params.query)
      );
    },
  });
}
