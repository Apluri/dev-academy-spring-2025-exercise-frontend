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
