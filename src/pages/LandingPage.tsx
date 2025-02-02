import { Box, Typography } from "@mui/material";
import ListRaw from "../components/ListRaw";
import DailyStatisticsList from "../components/DailyStatisticsList";

const LandingPage = () => {
  return (
    <Box>
      <Typography variant="h1">Daily electricity Statistics</Typography>
      <DailyStatisticsList />
      <Typography variant="h2">Raw Data</Typography>
      <ListRaw />
    </Box>
  );
};

export default LandingPage;
