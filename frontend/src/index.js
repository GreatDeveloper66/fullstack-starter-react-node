import ReactDOM from "react-dom/client";
import App from "./App.js"
import { AuthProvider } from "./Context/AuthContext.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
