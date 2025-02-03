import { z } from "zod";
import { stringOrNullToNumber } from "../helpers/dataParsing";
import { MetaDataSchema } from "./dataQueries";

// Types
export type DailyElectricityStatistics = z.infer<
  typeof DailyElectricityStatisticsSchema
>;

export type DailyElectricityData = z.infer<typeof DailyElectricityDataSchema>;

// Schemas
export const DailyElectricityStatisticsSchema = z.object({
  date: z
    .string()
    .transform((str) => new Date(str))
    .optional(),
  totalConsumption: stringOrNullToNumber.optional(),
  totalProduction: stringOrNullToNumber.optional(),
  averagePrice: stringOrNullToNumber.optional(),
  longestNegativePriceStreak: stringOrNullToNumber.optional(),
});

export const DailyElectricityDataSchema = z.object({
  data: z.array(DailyElectricityStatisticsSchema),
  meta: MetaDataSchema,
});
