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

const DailyStatisticsList = () => {
  // manage our own state for stuff we want to pass to the API
  // TODO should validate the user inputs.
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
    enableStickyHeader: true,
    enableGlobalFilter: false, //turn off built-in global filtering
    manualFiltering: true, //turn off built-in client-side filtering
    manualPagination: true, //turn off built-in client-side pagination
    manualSorting: true, //turn off built-in client-side sorting
    initialState: {
      showColumnFilters: true,
    },
    state: {
      // NOTE columnFilters: https://github.com/KevinVandy/material-react-table/issues/386
      // columnFilters are undefined when hotreloading application. Does not affect the built version
      // causes browser to provide a warning of "Warning: A component is changing an uncontrolled input of type undefined to be controlled."
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
      ? { color: "error", children: "Error while data: " + error.message }
      : undefined,
    muiTableContainerProps: {
      sx: {
        maxHeight: { xs: "60vh", md: "80vh" },
      },
    },
    muiTableHeadProps: {
      sx: {
        "& .MuiTableCell-root": {
          // Alings the header cells in a way that they always match the largest content style (ex. when one header has wrapping text)
          verticalAlign: "bottom",
          pb: 2,
        },
      },
    },
  });

  return (
    <Box>
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default DailyStatisticsList;
