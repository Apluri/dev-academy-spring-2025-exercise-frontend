import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173/",
    defaultCommandTimeout: 15000,
    requestTimeout: 20000,
    pageLoadTimeout: 60000,
  },
});
