import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'country-list',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './list.component.html',
})
export class ListComponent {
  countries = input.required<Country[]>();

  errorMessage = input<string | null | unknown>();
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false);
}
