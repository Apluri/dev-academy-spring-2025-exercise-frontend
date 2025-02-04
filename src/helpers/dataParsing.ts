import { fromZonedTime } from "date-fns-tz";
import { MRT_ColumnFiltersState } from "material-react-table";
import { z } from "zod";

/**
 * Transforms a string or null to a number | undefined.
 * @example stringOrNullToNumber.parse("123") // 123
 * @example stringOrNullToNumber.parse(null) // undefined
 */
export const stringOrNullToNumber = z
  .union([z.string(), z.null()])
  .transform((val) => {
    if (val === null) return undefined;
    const num = Number(val);
    return isNaN(num) ? undefined : num;
  });

/**
 * Transform Date values to UTC. Others keep as is.
 * @param filters MRTable filters
 * @returns New list of filters with Date values transformed to UTC
 */
export const formatDateValuesToUTC = (filters: MRT_ColumnFiltersState) => {
  return filters.map((filter) => {
    if (Array.isArray(filter.value)) {
      const [start, end] = filter.value;
      const startDate = start instanceof Date ? start : null;
      const endDate = end instanceof Date ? end : null;
      return {
        ...filter,
        value: [
          startDate ? fromZonedTime(startDate, "UTC").toISOString() : start,
          endDate ? fromZonedTime(endDate, "UTC").toISOString() : end,
        ],
      };
    }
    return filter;
  });
};
