import React, { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Header from "../components/Header";
import { Container } from "@mui/material";
import { authContext } from "../context/AuthProvider";

// pages
// import Order from "../pages/Order";
// import OrderDetails from "../pages/OrderDetails";
// import Store from "../pages/Store";
// import StoreUpdate from "../pages/StoreUpdate";
// import Customer from "../pages/Customer";
// import CustomerUpdate from "../pages/CustomerUpdate";
// import Product from "../pages/Product";
// import ProductUpdate from "../pages/ProductUpdate";
// import Category from "../pages/Category";
// import CategoryUpdate from "../pages/CategoryUpdate";
// import Reviews from "../pages/Reviews";
// import User from "../pages/User";
// import Images from "../pages/Images";
// import UserOrder from "../pages/User/UserOrder";
// import Wallet from "../pages/User/Wallet";

const Order = React.lazy(() => import("../pages/Order"));
const OrderDetails = React.lazy(() => import("../pages/OrderDetails"));
const Store = React.lazy(() => import("../pages/Store"));
const StoreUpdate = React.lazy(() => import("../pages/StoreUpdate"));
const Customer = React.lazy(() => import("../pages/Customer"));
const CustomerUpdate = React.lazy(() => import("../pages/CustomerUpdate"));
const Product = React.lazy(() => import("../pages/Product"));
const ProductUpdate = React.lazy(() => import("../pages/ProductUpdate"));
const Category = React.lazy(() => import("../pages/Category"));
const CategoryUpdate = React.lazy(() => import("../pages/CategoryUpdate"));
const Reviews = React.lazy(() => import("../pages/Reviews"));
const Images = React.lazy(() => import("../pages/Images"));
const Discount = React.lazy(() => import("../pages/Discount"));
const DiscountDetails = React.lazy(() => import("../pages/DiscountDetails"));

const AppRoute = () => {
  const authCntxt = React.useContext(authContext);

  return (
    <>
      {authCntxt.isLoggedIn ? (
        <>
          <Header />
          <Container>
            <Suspense>
              <Routes path="/">
                <Route index element={<Dashboard />} />
                {/* <Route path="/login" element={<>Order Lists</>} /> */}
                <Route path="order-list" element={<Order />} />
                <Route path="order-details/:oid" element={<OrderDetails />} />

                <Route path="store" element={<Store />} />
                <Route path="store/:sid" element={<StoreUpdate />} />
                <Route path="customer-list" element={<Customer />} />
                <Route path="customer/:cid/*" element={<CustomerUpdate />} />
                <Route path="product-list" element={<Product />} />
                <Route path="prod/:pid/*" element={<ProductUpdate />} />
                <Route path="reviews" element={<Reviews />} />
                <Route path="discounts" element={<Discount />} />
                <Route
                  path="discount-details/:did"
                  element={<DiscountDetails />}
                />

                {/* <Route path="user/:uid" element={<Navigate to={"profile"} />} />
              <Route path="user/:uid/:path_url" element={<User />} /> */}
                <Route path="images" element={<Images />} />
                <Route path="settings" element={<>Settings</>} />
                <Route path="create-order" element={<>Create Order</>} />
                <Route path="category" element={<Category />} />
                <Route path="cat/:cid" element={<CategoryUpdate />} />
              </Routes>
            </Suspense>
          </Container>
        </>
      ) : (
        <>
          <Suspense>
            <Login />
          </Suspense>
        </>
      )}
      {/* </Suspense> */}
    </>
  );
};

export default AppRoute;
