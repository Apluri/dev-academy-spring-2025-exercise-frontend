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
import { formatDateValuesToUTC } from "../helpers/dataParsing";

const BASE_URL = import.meta.env.VITE_ELECTRICITY_API_BASE_URL;

const routes = {
  dailyStatistics: "/api/statistics/daily",
  // Add more routes here
};

export const useGetDailyElectricityData = (
  columnFilters: MRT_ColumnFiltersState,
  pagination: MRT_PaginationState,
  sorting: MRT_SortingState
) => {
  return useQuery<DailyElectricityData>({
    queryKey: ["electricityData", { columnFilters, pagination, sorting }],
    queryFn: async () => {
      const fetchURL = new URL(routes.dailyStatistics, BASE_URL);

      fetchURL.searchParams.set(
        "pageStart",
        `${pagination.pageIndex * pagination.pageSize}`
      );

      fetchURL.searchParams.set(
        "pageStart",
        `${pagination.pageIndex * pagination.pageSize}`
      );
      fetchURL.searchParams.set("pageSize", `${pagination.pageSize}`);
      fetchURL.searchParams.set(
        "filters",
        JSON.stringify(formatDateValuesToUTC(columnFilters ?? []))
      );
      fetchURL.searchParams.set("sorting", JSON.stringify(sorting ?? []));
      const response = await fetch(fetchURL.href);
      const json = await response.json();
      const parsedData: DailyElectricityData =
        DailyElectricityDataSchema.parse(json);

      return parsedData;
    },
    placeholderData: keepPreviousData, // Display the previous data while fetching new data
  });
};
