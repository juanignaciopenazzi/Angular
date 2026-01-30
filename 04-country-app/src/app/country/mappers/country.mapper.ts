import { Country } from "../interfaces/country.interface";
import { RESTCountry } from "../interfaces/rest-countries.interface";


export class CountryMapper {

  // static RestCountry => Country
  static mapRestCountryToCountry( restCountry: RESTCountry ): Country {
    return {
      cca2: restCountry.cca2,
      flag : restCountry.flag,
      flagSVG: restCountry.flags.svg ?? '',
      name: restCountry.translations['spa'].common ?? 'No Spanish Name',
      capital: (restCountry.capital || ['No capital']).join(','),
      population: restCountry.population,
      region: restCountry.region,
      subRegion: restCountry.subregion,
    }
  }


  // static RestCountry => Country[]
  static mapRestCountryArrayToArrayCountry(restCountries: RESTCountry[]): Country[] {
     return restCountries.map( restCountry => this.mapRestCountryToCountry(restCountry) )
  }
}
