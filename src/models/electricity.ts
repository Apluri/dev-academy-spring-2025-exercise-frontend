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

export type ElectricityDataResponse = {
  data: ElectricityData[];
  meta: MetaData;
};
