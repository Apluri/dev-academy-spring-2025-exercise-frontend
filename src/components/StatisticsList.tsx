import { Box, Button } from "@mui/material";
import { ElectricityData } from "../models/electricity";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo, useState } from "react";

type Props = {
  data: ElectricityData[];
  isLoading: boolean;
  error: Error | null;
};

const StatisticsList = ({ data, isLoading, error }: Props) => {
  const [paginationMode, setPaginationMode] = useState<
    "infinite" | "pagination"
  >("pagination");
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
    muiTableBodyProps: {
      sx: {
        maxHeight: "50vh",
      },
    },
  });

  if (isLoading) return <Box>Loading...</Box>;
  if (error) return <Box>Error: {error.message}</Box>;

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
