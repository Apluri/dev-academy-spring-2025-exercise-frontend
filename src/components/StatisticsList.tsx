import { Box, Button } from "@mui/material";
import { ElectricityData } from "../models/electricity";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_SortingState,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo, useState } from "react";
import { useGetElectricityData } from "../apis/electricityStatistics";

type Props = {};

const StatisticsList = ({}: Props) => {
  //manage our own state for stuff we want to pass to the API
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    data: { data, meta },
    isError,
    isRefetching,
    isLoading,
    error,
  } = useGetElectricityData(columnFilters, globalFilter, pagination, sorting);

  console.log(columnFilters);
  const columns = useMemo<MRT_ColumnDef<ElectricityData>[]>(
    () => [
      {
        header: "id",
        accessorKey: "id",
        filterVariant: "range",
      },
      {
        header: "Start Time",
        accessorKey: "starttime",
        filterVariant: "datetime-range",
        Cell: ({ cell }) => {
          return cell.getValue<Date | undefined>()?.toLocaleString();
        },
      },
      {
        header: "Production Amount",
        accessorKey: "productionamount",
        filterVariant: "range",
      },
      {
        header: "Consumption Amount",
        accessorKey: "consumptionamount",
        filterVariant: "range",
      },
      {
        header: "Hourly Price",
        accessorKey: "hourlyprice",
        filterVariant: "range",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns: columns,
    data: data,
    enableRowVirtualization: true,
    manualFiltering: true, //turn off built-in client-side filtering
    manualPagination: true, //turn off built-in client-side pagination
    manualSorting: true, //turn off built-in client-side sorting
    muiTableBodyProps: {
      sx: {
        maxHeight: "50vh",
      },
    },
    initialState: {
      showColumnFilters: true,
    },
    state: {
      columnFilters,
      globalFilter,
      pagination,
      sorting,
      isLoading,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
    },
    rowCount: meta.totalRowCount,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    muiToolbarAlertBannerProps: isError
      ? { color: "error", children: "Error loading data" } // TODO check it works
      : undefined,
  });
  console.log(error);

  if (isLoading) return <Box>Loading...</Box>;
  if (isError) return <Box>Error</Box>; // TODO: better error handling

  return (
    <Box>
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default StatisticsList;
