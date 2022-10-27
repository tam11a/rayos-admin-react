import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Header from "../components/Header";
import { Container } from "@mui/material";
import { authContext } from "../context/AuthProvider";

// pages
import Order from "../pages/Order";
import Customer from "../pages/Customer";
import Product from "../pages/Product";
import Category from "../pages/Category";
import CategoryUpdate from "../pages/CategoryUpdate";
import User from "../pages/User";
import Images from "../pages/Images";
import UserOrder from "../pages/User/UserOrder";
import Wallet from "../pages/User/Wallet";

const AppRoute = () => {
  const authCntxt = React.useContext(authContext);

  return (
    <>
      {authCntxt.isLoggedIn ? (
        <>
          <Header />
          <Container>
            <Routes path="/">
              <Route index element={<Dashboard />} />
              {/* <Route path="/login" element={<>Order Lists</>} /> */}
              <Route path="order-list" element={<Order />} />
              <Route path="customer-list" element={<Customer />} />
              <Route path="product-list" element={<Product />} />
              <Route path="user/:uid" element={<Navigate to={"profile"} />} />
              <Route path="user/:uid/:path_url" element={<User />} />
              <Route path="images" element={<Images />} />
              <Route path="settings" element={<>Settings</>} />
              <Route path="create-order" element={<>Create Order</>} />
              <Route path="create-bim-order" element={<>Create BIM Order</>} />
              <Route path="category" element={<Category />} />
              <Route path="cat/:cid" element={<CategoryUpdate />} />
            </Routes>
          </Container>
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </>
  );
};

export default AppRoute;
