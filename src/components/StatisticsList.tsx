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
  const [paginationMode, setPaginationMode] = useState<
    "infinite" | "pagination"
  >("pagination");

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

  const columns = useMemo<MRT_ColumnDef<ElectricityData>[]>(
    () => [
      {
        header: "id",
        accessorKey: "id",
      },
      {
        header: "Date",
        accessorKey: "date",
        Cell: ({ cell }) => {
          return cell.getValue<Date | undefined>()?.toLocaleDateString();
        },
      },
      {
        header: "Start Time",
        accessorKey: "starttime",
        Cell: ({ cell }) => {
          return cell.getValue<Date | undefined>()?.toLocaleTimeString();
        },
      },
      {
        header: "Production Amount",
        accessorKey: "productionamount",
      },
      {
        header: "Consumption Amount",
        accessorKey: "consumptionamount",
      },
      {
        header: "Hourly Price",
        accessorKey: "hourlyprice",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns: columns,
    data: data,
    enableRowVirtualization: true,
    enablePagination: paginationMode === "pagination",
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
      ? { color: "error", children: "Error loading data" }
      : undefined,
  });
  console.log(error);

  if (isLoading) return <Box>Loading...</Box>;
  if (isError) return <Box>Error</Box>; // TODO: better error handling

  const handlePagniationModeChange = () => {
    if (paginationMode === "infinite") {
      setPaginationMode("pagination");
    } else {
      setPaginationMode("infinite");
    }
  };

  return (
    <Box>
      <Button onClick={handlePagniationModeChange}>
        Change pagination mode
      </Button>
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default StatisticsList;
