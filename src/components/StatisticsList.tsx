import { Box, Typography } from "@mui/material";
import { ElectricityData } from "../models/electricity";

type Props = {
  data: ElectricityData[] | undefined;
  isLoading: boolean;
  error: Error | null;
};

const StatisticsList = ({ data, isLoading, error }: Props) => {
  if (isLoading) return <Box>Loading...</Box>;
  if (error) return <Box>Error: {error.message}</Box>;
  if (data === undefined) return <Box>data is undefined</Box>;

  return (
    <Box>
      {data.map((element: ElectricityData) => {
        return (
          <Box key={element.id}>
            <Typography>helo</Typography>
            <Typography>{element.id}</Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default StatisticsList;
