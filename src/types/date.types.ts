export type FirstDayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface Month {
  year: number;
  month: number;
  date: Date;
}

export interface Day {
  label: string;
  date: Date;
}
