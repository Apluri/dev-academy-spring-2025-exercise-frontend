import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LandingPage from "./pages/LandingPage";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <LandingPage />
      </LocalizationProvider>
    </QueryClientProvider>
  );
};

export default App;
