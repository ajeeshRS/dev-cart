const getHeaders = () => {
  const token = localStorage.getItem("token");
  console.log("token:", token);

  return {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export { getHeaders };
