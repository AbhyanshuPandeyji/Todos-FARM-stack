import axios from "axios";

// we can create any base url with this
// export const makeRequest = axios.create({
//   baseURL: "https://blog-app-backend-psi.vercel.app/api/",
//   withCredentials: true,
// });
export const makeRequest = axios.create({
  baseURL: "https://blog-app-backend-2.onrender.com/api/",
  withCredentials: true,
});

// do same with proxy  in package.json file
