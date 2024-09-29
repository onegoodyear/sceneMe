import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Lists from "./pages/Lists";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          exact
          element={<Home />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/lists"
          element={<Lists />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
