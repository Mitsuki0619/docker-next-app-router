import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: {
      target: "./openapi/api.yaml",
    },
    output: {
      target: "./src/__generated__/api.ts",
      clean: true,
      baseUrl: "http://localhost:4010",
      override: {
        mutator: {
          path: "./src/lib/custom-instance.ts",
          name: "customInstance",
        },
      },
    },
  },
});
