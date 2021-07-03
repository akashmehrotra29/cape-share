import axios from "axios";
import { BASE_URL } from "../../common/api.config";

export const setAxiosBaseURL = () => {
  axios.defaults.baseURL = BASE_URL;
};

export const saveUser = (user, token) => {
  localStorage.setItem(
    "user",
    JSON.stringify({ userId: user.id, token: token })
  );
};

export const removeUser = () => localStorage.removeItem("user");

export const setupAuthHeadersForApiCalls = (token) => {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = token);
  }
  return axios.defaults.headers.common["Authorization"];
};

export const setupAuthExceptionHandler = (
  dispatch,
  logout,
  navigate,
  toast
) => {
  const UNAUTHORIZED = 401;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === UNAUTHORIZED) {
        toast({
          position: "bottom-right",
          title: `Session Expired`,
          description: "Please login again",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        dispatch(logout());
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );
};
