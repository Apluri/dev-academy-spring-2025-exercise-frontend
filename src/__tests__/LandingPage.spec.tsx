import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import LandingPage from "../pages/LandingPage";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";

const queryClient = new QueryClient();

describe("LandingPage", () => {
  it("should render the landing page header", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <LandingPage />
        </LocalizationProvider>
      </QueryClientProvider>
    );

    const headerText = screen.getByText(/Daily Electricity Statistics/);
    expect(headerText).toBeInTheDocument();
  });
});
