import { ElectricityData } from "../models/electricity";

export const fetchHelloWorld = async () => {
  // TODO error boundary
  const response: Response = await fetch("http://localhost:3000/api/stats");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data: ElectricityData[] = await response.json();
  return data;
};
