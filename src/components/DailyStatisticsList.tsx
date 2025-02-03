import { Box } from "@mui/material";
import { DailyElectricityStatistics } from "../types/electricityData";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_SortingState,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo, useState } from "react";
import { useGetDailyElectricityData } from "../apis/electricityStatistics";
import StatisticsCell from "./StatisticsCell";
type Props = {};

const DailyStatisticsList = ({}: Props) => {
  //manage our own state for stuff we want to pass to the API
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    data: { data, meta } = { data: [], meta: { totalRowCount: 0 } },
    isError,
    isRefetching,
    isLoading,
    error,
  } = useGetDailyElectricityData(columnFilters, pagination, sorting);

  const columns = useMemo<MRT_ColumnDef<DailyElectricityStatistics>[]>(
    () => [
      {
        header: "Date",
        accessorKey: "date",
        filterVariant: "date-range",
        Cell: ({ cell }) => {
          return cell.getValue<Date | undefined>()?.toLocaleDateString();
        },
      },
      {
        header: "Total consumption",
        accessorKey: "totalConsumption",
        filterVariant: "range",
        Cell: ({ cell }) => (
          <StatisticsCell
            unitType="kWh"
            value={cell.getValue<number>()}
            digits={0}
          />
        ),
      },
      {
        header: "Total production",
        accessorKey: "totalProduction",
        filterVariant: "range",
        Cell: ({ cell }) => (
          <StatisticsCell
            unitType="mWh"
            value={cell.getValue<number>()}
            digits={0}
          />
        ),
      },
      {
        header: "Average price",
        accessorKey: "averagePrice",
        filterVariant: "range",
        Cell: ({ cell }) => (
          <StatisticsCell
            unitType="c/kWh"
            value={cell.getValue<number>()}
            digits={2}
          />
        ),
      },
      {
        header: "Longest negative price streak",
        accessorKey: "longestNegativePriceStreak",
        filterVariant: "range",
        Cell: ({ cell }) => (
          <StatisticsCell
            unitType="hours"
            value={cell.getValue<number>()}
            digits={0}
          />
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns: columns,
    data: data,
    enableGlobalFilter: false, //turn off built-in global filtering
    manualFiltering: true, //turn off built-in client-side filtering
    manualPagination: true, //turn off built-in client-side pagination
    manualSorting: true, //turn off built-in client-side sorting
    initialState: {
      showColumnFilters: true,
    },
    state: {
      columnFilters,
      pagination,
      sorting,
      isLoading,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
    },
    rowCount: meta.totalRowCount,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    muiToolbarAlertBannerProps: isError
      ? { color: "error", children: "Error loading data: " + error.message }
      : undefined,
  });

  return (
    <Box>
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default DailyStatisticsList;
