import { ElectricityData } from "../models/electricity";

/**
 * Handles the conversion of date strings to Date objects
 * @param electricityData
 * @returns ElectricityData[] with date values converted to Date objects or undefined
 */
const initDateValues = (
  electricityData: ElectricityData[]
): ElectricityData[] => {
  return electricityData.map((data) => {
    return {
      ...data,
      date: data.date ? new Date(data.date) : undefined,
      starttime: data.starttime ? new Date(data.starttime) : undefined,
    };
  });
};

export const getElectricityData = async () => {
  // TODO error boundary
  const response: Response = await fetch("http://localhost:3000/api/stats");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data: ElectricityData[] = await response.json();
  const convertedData = initDateValues(data);
  return convertedData;
};
