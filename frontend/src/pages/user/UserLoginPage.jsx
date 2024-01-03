import NavBar from "../../components/NavBar/NavBar";
import { useLocation } from "react-router-dom";
import UserSignup from "../../components/Login/User/UserSignup";
import UserLogin from "../../components/Login/User/UserLogin";
import StdNavBar from "../../components/StdNavBar/StdNavBar";

function UserLoginPage() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <>
      <StdNavBar />

      {pathname === "/user/login" ? (
        <UserLogin />
      ) : pathname === "/user/signup" ? (
        <UserSignup />
      ) : null}
    </>
  );
}

export default UserLoginPage;
