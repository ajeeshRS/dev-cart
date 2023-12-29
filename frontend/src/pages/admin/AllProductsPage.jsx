import React, { useEffect, useState } from "react";
import AdminNavBar from "../../components/AdminNavBar/AdminNavBar";
import AllProducts from "../../components/AllProductsPage/AllProducts";
import { getAdminHeaders } from "../../utils/adminAuth.js";
import axios from "axios";

function AllProductsPage() {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const getAdmin = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/admin/all-products",
          {
            headers: getAdminHeaders(),
          }
        );
        setAdmin(response.data.admin);
        // console.log(response.data.message);
      } catch (err) {
        console.log(err);
      }
    };
    getAdmin();
  }, []);

  return (
    <>
      <AdminNavBar admin={admin} />
      <AllProducts admin={admin} />
    </>
  );
}

export default AllProductsPage;
