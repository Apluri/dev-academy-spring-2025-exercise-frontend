import { Container, Typography } from "@mui/material";
import DailyStatisticsList from "../components/DailyStatisticsList";

const LandingPage = () => {
  return (
    <Container maxWidth="xl" disableGutters>
      <Typography variant="h1" sx={{ fontSize: { xs: "3rem", md: "4rem" } }}>
        Daily Electricity Statistics
      </Typography>
      <DailyStatisticsList />
    </Container>
  );
};

export default LandingPage;
