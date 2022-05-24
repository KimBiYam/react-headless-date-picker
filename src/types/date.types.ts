export type FirstDayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface Month {
  date: Date;
  label: string;
}

export interface Day {
  label: string;
  date: Date;
}
