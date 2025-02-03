import {
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_SortingState,
} from "material-react-table";
import { DailyElectricityDataDTO } from "../types/electricityData";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const BASE_URL = "http://localhost:3000/";

export const useGetDailyElectricityData = (
  columnFilters: MRT_ColumnFiltersState,
  pagination: MRT_PaginationState,
  sorting: MRT_SortingState
) => {
  return useQuery<DailyElectricityDataDTO>({
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
      const json: DailyElectricityDataDTO = await response.json();

      const convertedData: DailyElectricityDataDTO = {
        data: json.data.map((data) => {
          return {
            ...data,
            date: (() => {
              if (data.date) {
                return new Date(data.date);
              } else {
                throw new Error("Date is required");
              }
            })(),
          };
        }),
        meta: json.meta,
      };
      return convertedData;
    },
    placeholderData: keepPreviousData, //don't go to 0 rows when refetching or paginating to next page
  });
};
