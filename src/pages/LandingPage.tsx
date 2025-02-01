import { Box, Typography } from "@mui/material";
import StatisticsList from "../components/StatisticsList";

const LandingPage = () => {
  return (
    <Box>
      <Typography variant="h1">Electricity Statistics</Typography>
      <StatisticsList />
    </Box>
  );
};

export default LandingPage;
