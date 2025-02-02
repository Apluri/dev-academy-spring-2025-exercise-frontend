import {
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_SortingState,
} from "material-react-table";
import {
  DailyElectricityDataDTO,
  ElectricityData,
  ElectricityDataDTO as ElectricityDataDTO,
} from "../models/electricity";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const BASE_URL = "http://localhost:3000/";

/**
 * Handles the conversion of date strings to Date objects
 * @param electricityData
 * @returns ElectricityData[] with date values converted to Date objects or undefined
 */
const initDateValues = (
  electricityData: ElectricityData[]
): ElectricityData[] => {
  return electricityData.map((data) => {
    return {
      ...data,
      date: data.date ? new Date(data.date) : undefined,
      starttime: data.starttime ? new Date(data.starttime) : undefined,
    };
  });
};

export const useGetElectricityData = (
  columnFilters: MRT_ColumnFiltersState,
  pagination: MRT_PaginationState,
  sorting: MRT_SortingState
) => {
  return useQuery<ElectricityDataDTO>({
    queryKey: ["electricityData", { columnFilters, pagination, sorting }],
    queryFn: async () => {
      const fetchURL = new URL("/api/statistics/raw", BASE_URL);

      fetchURL.searchParams.set(
        "pageStart",
        `${pagination.pageIndex * pagination.pageSize}`
      );
      fetchURL.searchParams.set("pageSize", `${pagination.pageSize}`);
      fetchURL.searchParams.set("filters", JSON.stringify(columnFilters ?? []));
      fetchURL.searchParams.set("sorting", JSON.stringify(sorting ?? []));

      const response = await fetch(fetchURL.href);
      const json: ElectricityDataDTO = await response.json();
      const convertedData: ElectricityDataDTO = {
        data: initDateValues(json.data),
        meta: json.meta,
      };

      return convertedData;
    },
    placeholderData: keepPreviousData, //don't go to 0 rows when refetching or paginating to next page
  });
};

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
