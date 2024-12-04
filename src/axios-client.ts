import fetcher from "axios";
// import { signOut } from "next-auth/react";

export const axios = fetcher.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    authentication: `$2b$10$WigDg5zlt0rtL/hMLKPh8OTuqjEFZRkP27wc7NjsWdeomGHwc2tD6`,
  },
});

// axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status == 401) {
//       // signOut();
//     }
//     return error.response;

//   }
// );


export default axios;