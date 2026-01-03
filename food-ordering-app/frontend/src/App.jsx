import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages//Login";
import Register from "./pages/Register";
import Foods from "./pages/Food";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import FoodDetailsPage from "./pages/FoodDetailsPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer"
import Orders from "./pages/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
    const location = useLocation();
      const hideLayoutRoutes = ["/login", "/register"];
       const hideLayout = hideLayoutRoutes.includes(location.pathname);
  return (
    <>
  <ToastContainer position="top-center" autoClose={3000} />
     {!hideLayout && <Header />}
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Foods />} />
      <Route path="/cart" element={<Cart />} />
<Route path="/admin" element={<Admin />} />
<Route path="/food/:id" element={<FoodDetailsPage />} />
<Route path="/orders" element={<Orders />} />
    </Routes>
    {!hideLayout && <Footer />}
    </>
  );
};

export default App;
