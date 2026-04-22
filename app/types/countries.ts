/** GET /api/V1/countries — список стран с вложенными городами */

export interface City {
  id: number
  name: string
}

export interface Country {
  id: number
  name: string
  cities: City[]
}

export interface CountriesResponse {
  success: boolean
  countries: Country[]
}
