import { DecimalPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { Country } from 'src/app/country/interfaces/country.interface';

@Component({
  selector: 'country-information-page',
  imports: [DecimalPipe],
  templateUrl: './country-information.component.html',
})
export class CountryInformationComponent {

  country = input.required<Country>();

  currentYear = computed(() => {
    return new Date().getFullYear();
  });
}
