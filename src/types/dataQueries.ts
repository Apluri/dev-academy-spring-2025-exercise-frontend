import { z } from "zod";

// Types
export type MetaData = z.infer<typeof MetaDataSchema>;

// Schemas
export const MetaDataSchema = z.object({
  totalRowCount: z.number(),
});
