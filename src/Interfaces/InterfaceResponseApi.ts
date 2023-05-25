export interface ILeague {
  id: number,
  name: string,
  logo: string,
  sessons?: number[]
}

export interface ITeam {
  id: number,
  code: string,
  name: string,
  logo: string
}

export interface IPlayer {
  name: string,
  age: number,
  nationality: string,
}

export interface Coutry {
  name: string,
  code: string
  flag: string
}
