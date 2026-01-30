import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { map, Observable, catchError, throwError, delay, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { Region } from '../interfaces/region.interface';



@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<Region, Country[]>();


  searchByCapital( query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if ( this.queryCacheCapital.has(query) ) {
      return of( this.queryCacheCapital.get(query) ?? [] );
    }

    return this.http.get<RESTCountry[]>(`${ environment.countryUrl }/capital/${ query }`).pipe(
      map( (restCountries) => CountryMapper.mapRestCountryArrayToArrayCountry(restCountries)),
      tap( (countries) => this.queryCacheCapital.set(query, countries)),
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

    if ( this.queryCacheCountry.has(query) ) {
      return of(  this.queryCacheCountry.get(query) ?? [] );
    }

    return this.http.get<RESTCountry[]>(`${ environment.countryUrl }/name/${ query }`).pipe(
      map( (restCounties) => CountryMapper.mapRestCountryArrayToArrayCountry(restCounties)),
      tap( (countries) => this.queryCacheCountry.set(query, countries)),
      catchError((error) => {
        console.log('Error fetching', error);
        return throwError(
          () => new Error(`No se pudo obtener países con ese query: ${query}`)
        );
      })
    );
  }


  searchByRegion( region: Region ): Observable<Country[]> {

    if ( this.queryCacheRegion.has(region) ) {
      return of( this.queryCacheRegion.get(region) ?? [] );
    }

    return this.http.get<RESTCountry[]>(`${ environment.countryUrl }/region/${ region }`).pipe(
      map( (restCountries) => CountryMapper.mapRestCountryArrayToArrayCountry(restCountries)),
      tap( (countries) => this.queryCacheRegion.set(region, countries)),
      catchError((error) => {
        console.log('Error fetching', error);
        return throwError(
          () => new Error(`No se pudo obtener países con ese query: ${region}`)
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
