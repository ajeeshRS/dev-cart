import "./App.css";
import HomePage from "./pages/HomePage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import { Route, Routes } from "react-router-dom";
import UserLoginPage from "./pages/user/UserLoginPage";
import PrivatePage from "./pages/PrivatePage";
import AddProductPage from "./pages/admin/AddProductPage";
import AllProductsPage from "./pages/admin/AllProductsPage";
import EditProductPage from "./pages/admin/EditProductPage";
import UserHome from "./pages/user/UserHome";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/user/login" element={<UserLoginPage />} />
        <Route path="/user/signup" element={<UserLoginPage />} />
        <Route path="/private-page" element={<PrivatePage />} />
        <Route path="/admin/add-product" element={<AddProductPage />} />
        <Route path="/admin/all-products" element={<AllProductsPage />} />
        <Route path="/admin/Edit-product/:id" element={<EditProductPage />} />
        <Route path="/home" element={<UserHome/>} />

      </Routes>
      
    </>
  );
}


export default App;
