// src/App.test.js
import { render } from "@testing-library/react";
import App from "./App";

// Mock problematic ESM dependencies
jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

// Add other mocks if needed
// jest.mock("./Context/AuthContext.jsx", () => ({
//   AuthProvider: ({ children }) => <>{children}</>,
// }));

test("App renders without crashing", () => {
  render(<App />);
});
