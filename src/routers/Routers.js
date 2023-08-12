import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Cart from "../pages/Cart";
import CheckOut from "../pages/CheckOut";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Shop from "../pages/Shop";
import ProductDetails from "../pages/ProductDetails";
import ProtectedRoute from "./ProtectedRoute";

import AdminNav from "../admin/AdminNav";
import AddProduct from "../admin/AddProdict";
import AllProduct from "../admin/AllProduct";
import Dashboard from "../admin/Dashboard";
import Users from "../admin/Users";
import ProtectApp from "./protecApp";

function Routers() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="Login" element={<Login />} />
        <Route path="SignUp" element={<SignUp />} />

        <Route path="/*" element={<ProtectedRoute />}>
          <Route path="checkout" element={<CheckOut />} />

          <Route path="/*" element={<ProtectApp />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dashboard/admin_nav" element={<AdminNav />} />
            <Route path="dashboard/add_product" element={<AddProduct />} />
            <Route path="dashboard/all_product" element={<AllProduct />} />
            <Route path="dashboard/users" element={<Users />} />
          </Route>
        </Route>

        <Route path="Shop" element={<Shop />} />
        <Route path="product/:producId" element={<ProductDetails />} />
      </Routes>
    </div>
  );
}

export default Routers;
