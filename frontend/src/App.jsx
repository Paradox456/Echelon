import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Header from "./components/Header";

const Layout = ({ children }) => {
  const location = useLocation();
  const hideHeaderPaths = ["/login", "/register"];

  const shouldHideHeader = hideHeaderPaths.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      {!shouldHideHeader && <Header />}
      {children}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
