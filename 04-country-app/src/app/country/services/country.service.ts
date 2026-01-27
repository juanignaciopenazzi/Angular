import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { map, Observable, catchError, throwError, delay } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';



@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);

  searchByCapital( query: string): Observable<Country[]> {
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${ environment.countryUrl }/capital/${ query }`).pipe(
      map( (restCountries) => CountryMapper.mapRestCountryArrayToArrayCountry(restCountries)),
      catchError(error => {
        console.log('Error fetching', error);
        return throwError(
          () => new Error (`No se pudo obtener país con nombre: ${query}`)
        );
      })
    );
  }

  searchByCountry( query: string ): Observable<Country[]> {
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${ environment.countryUrl }/name/${ query }`).pipe(
      map( (restCounties) => CountryMapper.mapRestCountryArrayToArrayCountry(restCounties)),
      delay(1000),
      catchError((error) => {
        console.log('Error fetching', error);
        return throwError(
          () => new Error(`No se pudo obtener países con ese query: ${query}`)
        );
      })
    );
  }

  searchCountryByAlphaCode( code: string): Observable<Country | undefined> {
    return this.http.get<RESTCountry[]>(`${environment.countryUrl}/alpha/${code}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToArrayCountry(resp)),
      map( countries => countries.at(0) ),
      catchError((error) => {
        console.log('Error fetching ', error);
        return throwError(
          () => new Error(`No se pudo obtener país con ese codigo ${code}`)
        );
      })
    );
  }
}
