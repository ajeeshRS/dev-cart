import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Home from "../../components/Home/Home";
import { useLocation } from "react-router-dom";
import SearchNavBar from "../../components/SearchNavbar/SearchNavBar";
import SearchPage from "../../components/SearchPage/SearchPage";

function UserHome() {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <>
      {pathName === "/user/home" ? (
        <>
          <NavBar />
          <Home />
        </>
      ) : pathName === "/user/search" ? (
        <>
          <SearchNavBar />
          <SearchPage />
        </>
      ) : null}
    </>
  );
}

export default UserHome;
