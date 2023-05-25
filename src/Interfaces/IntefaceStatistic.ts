export interface IStatistic {
  games: string,
  wins: string,
  draws: string,
  loses: string,
  lineups: string,
  goals: IGoalsForMinute
}

export interface IGoalsForMinute {
  '0-15': {
    total: number;
    percentage: string;
  },
  '16-30': {
    total: number;
    percentage: string;
  },
  '31-45': {
    total: number;
    percentage: string;
  },
  '46-60': {
    total: number;
    percentage: string;
  },
  '61-75': {
    total: number;
    percentage: string;
  },
  '76-90': {
    total: number;
    percentage: string;
  },
  '91-105': {
    total: number;
    percentage: string;
  },
  '106-120': {
    total: number;
    percentage: string;
  }
}