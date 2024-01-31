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
import { SearchProvider } from "./context/SearchContext";
import ChooseAddress from "./pages/user/ChooseAddress";
import AddAddressPage from "./pages/user/AddAddressPage";
import ViewAddresses from "./pages/user/ViewAddresses";
import EditAddressPage from "./pages/user/EditAddressPage";
import OrderSummaryPage from "./pages/user/OrderSummaryPage";
import OrderConfirmPage from "./pages/user/OrderConfirmPage";
import UserProfilePage from "./pages/user/UserProfilePage";
import UserOrderPage from "./pages/user/UserOrderPage";
import ViewOrderPage from "./pages/user/ViewOrderPage";
import EditProfilePage from "./pages/user/EditProfilePage";
import ChangeUsernamePage from "./pages/user/ChangeUsernamePage";
import ResetPasswordPage from "./pages/user/ResetPasswordPage";
import AddCouponPage from "./pages/admin/AddCouponPage";
import Dashboard from "./pages/admin/Dashboard";

function App() {
  return (
    <>
      <SearchProvider>
        <Routes>
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/add-coupon" element={<AddCouponPage />} />
          <Route path="/user/login" element={<UserLoginPage />} />
          <Route path="/user/signup" element={<UserLoginPage />} />
          <Route path="/admin/add-product" element={<AddProductPage />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/all-products" element={<AllProductsPage />} />
          <Route path="/admin/Edit-product/:id" element={<EditProductPage />} />
          <Route path="/user/home" element={<UserHome />} />
          <Route path="/user/:category" element={<ProductPageOnCategory />} />
          <Route path="/user/view-product/:id" element={<ViewProduct />} />
          <Route path="/user/wishlist" element={<WishList />} />
          <Route path="/user/cart" element={<UserCartPage />} />
          <Route path="/user/search" element={<UserHome />} />
          <Route
            path="/user/address/add-address"
            element={<AddAddressPage />}
          />
          <Route
            path="/user/address/saved-addresses"
            element={<ViewAddresses />}
          />
          <Route
            path="/user/address/update-address/:id"
            element={<EditAddressPage />}
          />
          <Route
            path="/user/cart/checkout/address"
            element={<ChooseAddress />}
          />
          <Route
            path="/user/cart/checkout/order-summary"
            element={<OrderSummaryPage />}
          />
          <Route
            path="/user/cart/checkout/order-confirm"
            element={<OrderConfirmPage />}
          />
          <Route path="/user/profile" element={<UserProfilePage />} />
          <Route path="/user/profile/orders" element={<UserOrderPage />} />
          <Route
            path="/user/profile/orders/view-order/:id"
            element={<ViewOrderPage />}
          />
          <Route
            path="/user/profile/edit-profile"
            element={<EditProfilePage />}
          />
          <Route
            path="/user/profile/edit-profile/reset-password"
            element={<ResetPasswordPage />}
          />
          <Route
            path="/user/profile/edit-profile/change-username"
            element={<ChangeUsernamePage />}
          />
        </Routes>
      </SearchProvider>
    </>
  );
}

export default App;
