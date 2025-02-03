import { MetaData } from "./dataQueries";

// Models
export type ElectricityData = {
  id: number;
  date?: Date;
  starttime?: Date;
  productionamount?: number;
  consumptionamount?: number;
  hourlyprice?: number;
};

export type DailyElectricityStatistics = {
  date: Date;
  totalConsumption: number;
  totalProduction: number;
  averagePrice: number;
  longestNegativePriceStreak: number;
};

// DataTransferObjects
export type RawElectricityData = {
  data: ElectricityData[];
  meta: MetaData;
};

export type DailyElectricityData = {
  data: DailyElectricityStatistics[];
  meta: MetaData;
};
