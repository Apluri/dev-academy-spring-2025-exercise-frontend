import {
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_SortingState,
} from "material-react-table";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  DailyElectricityData,
  DailyElectricityDataSchema,
} from "../types/electricityData";

export const BASE_URL = "http://localhost:3000/";

export const useGetDailyElectricityData = (
  columnFilters: MRT_ColumnFiltersState,
  pagination: MRT_PaginationState,
  sorting: MRT_SortingState
) => {
  return useQuery<DailyElectricityData>({
    queryKey: ["electricityData", { columnFilters, pagination, sorting }],
    queryFn: async () => {
      const fetchURL = new URL("/api/statistics/daily", BASE_URL);

      fetchURL.searchParams.set(
        "pageStart",
        `${pagination.pageIndex * pagination.pageSize}`
      );
      fetchURL.searchParams.set("pageSize", `${pagination.pageSize}`);
      fetchURL.searchParams.set("filters", JSON.stringify(columnFilters ?? []));
      fetchURL.searchParams.set("sorting", JSON.stringify(sorting ?? []));

      const response = await fetch(fetchURL.href);
      const json = await response.json();
      const convertedData: DailyElectricityData =
        DailyElectricityDataSchema.parse(json);

      return convertedData;
    },
    placeholderData: keepPreviousData, //don't go to 0 rows when refetching or paginating to next page
  });
};
