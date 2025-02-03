import { z } from "zod";

export const stringOrNullToNumber = z
  .union([z.string(), z.null()])
  .transform((val) => (val !== null ? Number(val) : undefined));
