export interface IStatistic {
  games: string,
  wins: string,
  draws: string,
  loses: string,
  lineups?: string,
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

export const StaticsDefault = {
  games: "",
  wins: "",
  draws: "",
  loses: "",
  lineups: "",
  goals: {
    '0-15': {
      total: 0,
      percentage: ""
    },
    '16-30': {
      total: 0,
      percentage: ""
    },
    '31-45': {
      total: 0,
      percentage: ""
    },
    '46-60': {
      total: 0,
      percentage: ""
    },
    '61-75': {
      total: 0,
      percentage: ""
    },
    '76-90': {
      total: 0,
      percentage: ""
    },
    '91-105': {
      total: 0,
      percentage: ""
    },
    '106-120': {
      total: 0,
      percentage: ""
    }
  }
}