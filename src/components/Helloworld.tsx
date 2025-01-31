import { useQuery } from "@tanstack/react-query";
import React from "react";

const fetchHelloWorld = async () => {
  const response = await fetch("https://swapi.dev/api/people/1/");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const Helloworld: React.FC = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["helloWorld"],
    queryFn: fetchHelloWorld,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Hello World</h1>
      <p>{data.name}</p>
    </div>
  );
};

export default Helloworld;
