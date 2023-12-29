const getAdminHeaders = () => {
  const token = localStorage.getItem("adminAccessToken");
  console.log("token:", token);
  return {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export { getAdminHeaders };
