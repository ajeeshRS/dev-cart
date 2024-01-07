const getHeaders = () => {
  const token = localStorage.getItem("token");
 
  return {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export { getHeaders };
