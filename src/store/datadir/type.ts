export interface Datum {
  name: string
  data: string[]
}

export interface Map {
  title: string
  base: number
  unit: string
  data: Datum[]
}

export interface Datum2 {
  name: string
  data: string[]
}

export interface Seller {
  title: string
  base: number
  unit: string
  data: Datum2[]
}

export interface Datum3 {
  name: string
  data: string[]
}

export interface Commodity {
  title: string
  base: number
  unit: string
  data: Datum3[]
}

export interface Common {
  month: string[]
}

export interface Type {
  key: string
  text: string
}

export interface ITrendType {
  map: Map
  seller: Seller
  commodity: Commodity
  common: Common
  type: Type[]
}
// hotproduct
export interface Child2 {
  name: string
  value: number
}

export interface Child {
  name: string
  value: number
  children: Child2[]
}

export interface IProductType {
  name: string
  children: Child[]
}
export interface IRankType {
  name: string
  value: number
}
