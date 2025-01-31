import { Box, Button } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import Helloworld from "./components/Helloworld";

const queryClient = new QueryClient();

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <QueryClientProvider client={queryClient}>
      <Box>
        <Button
          variant="contained"
          onClick={() => setCount((prev) => prev + 1)}
        >
          Click me:
          {count}
        </Button>
        <Helloworld />
      </Box>
    </QueryClientProvider>
  );
};

export default App;
