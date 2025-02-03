import { Box, Typography } from "@mui/material";
import DailyStatisticsList from "../components/DailyStatisticsList";

const LandingPage = () => {
  return (
    <Box>
      <Typography variant="h1">Daily electricity Statistics</Typography>
      <DailyStatisticsList />
    </Box>
  );
};

export default LandingPage;
