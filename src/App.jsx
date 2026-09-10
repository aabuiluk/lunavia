import { BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import "./global.css";

export default function App() {
  return (
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
}

