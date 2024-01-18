import { useLocation } from "react-router-dom";
import AdminLogin from "../../components/Login/Admin/AdminLogin";
import AdminNavBar from "../../components/AdminNavBar/AdminNavBar";
import { useEffect } from "react";
import axios from "axios";
function AdminLoginPage() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <>
      <AdminNavBar />
      <AdminLogin />
    </>
  );
}

export default AdminLoginPage;
