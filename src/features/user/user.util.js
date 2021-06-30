import axios from "axios";
import { BASE_URL } from "../../common/api.config";

export const setAxiosBaseURL = () => {
  axios.defaults.baseURL = BASE_URL;
};
