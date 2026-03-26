export interface City {
  id: number
  title: string
}

export interface Country {
  id: number
  title: string
  cities: City[]
}

export interface CountriesResponse {
  data: Country[]
}
