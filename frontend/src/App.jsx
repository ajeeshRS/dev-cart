import "./App.css";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import { Route, Routes } from "react-router-dom";
import UserLoginPage from "./pages/user/UserLoginPage";
import AddProductPage from "./pages/admin/AddProductPage";
import AllProductsPage from "./pages/admin/AllProductsPage";
import EditProductPage from "./pages/admin/EditProductPage";
import UserHome from "./pages/user/UserHome";
import ProductPageOnCategory from "./pages/user/ProductPageOnCategory";
import ViewProduct from "./pages/user/ViewProduct";
import WishList from "./pages/user/WishList";
import UserCartPage from "./pages/user/userCartPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/user/login" element={<UserLoginPage />} />
        <Route path="/user/signup" element={<UserLoginPage />} />
        <Route path="/admin/add-product" element={<AddProductPage />} />
        <Route path="/admin/all-products" element={<AllProductsPage />} />
        <Route path="/admin/Edit-product/:id" element={<EditProductPage />} />
        <Route path="user/home" element={<UserHome/>} />
        <Route path="user/:category" element={<ProductPageOnCategory/>} />
        <Route path="user/view-product/:id" element={<ViewProduct/>} />
        <Route path="user/wishlist" element={<WishList/>} />
        <Route path="user/cart" element={<UserCartPage/>} />
      </Routes>
      
    </>
  );
}


export default App;
