import { useLocation } from "react-router-dom";
import AdminLogin from "../../components/Login/Admin/AdminLogin";
import AdminNavBar from "../../components/AdminNavBar/AdminNavBar";
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
