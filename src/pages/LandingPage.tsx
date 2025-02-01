import { Box, Typography } from "@mui/material";
import StatisticsList from "../components/StatisticsList";
import { useQuery } from "@tanstack/react-query";
import { getElectricityData } from "../apis/electricityStatistics";

const LandingPage = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["helloWorld"],
    queryFn: getElectricityData,
    initialData: [],
  });
  return (
    <Box>
      <Typography variant="h1">Electricity Statistics</Typography>
      <StatisticsList data={data} error={error} isLoading={isLoading} />
    </Box>
  );
};

export default LandingPage;
