export const setStorageItem = async (data) => {
  //   console.log("data in local storage", data);
  return localStorage.setItem("blog-user", data);
};

export const getStorageItem = async () => {
  return await localStorage.getItem("blog-user");
};
