export type ElectricityData = {
  id: number;
  date?: Date;
  starttime?: Date;
  productionamount?: number;
  consumptionamount?: number;
  hourlyprice?: number;
};

export type MetaData = {
  totalRowCount: number;
};

export type ElectricityDataDTO = {
  data: ElectricityData[];
  meta: MetaData;
};

export type DailyElectricityDataDTO = {
  data: DailyElectricityData[];
  meta: MetaData;
};

export type DailyElectricityData = {
  date: Date;
  totalConsumption: number;
  totalProduction: number;
  averagePrice: number;
  longestNegativePriceStreak: number;
};
