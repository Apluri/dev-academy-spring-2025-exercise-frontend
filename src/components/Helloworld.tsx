import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ElectricityData } from "../models/electricity";
import { Box, Typography } from "@mui/material";

const fetchHelloWorld = async () => {
  // TODO error boundary
  const response: Response = await fetch("http://localhost:3000/api/stats");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data: ElectricityData[] = await response.json();
  return data;
};

const Helloworld: React.FC = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["helloWorld"],
    queryFn: fetchHelloWorld,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (data === undefined) return <div>data is undefined</div>;

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

export default Helloworld;
