// Import the axiosClient module, presumably containing Axios configuration.
import axiosClient from "./axiosClient";

// Create an object called authApi, which contains various methods related to authentication.
const authApi = {
  // signup method sends a POST request to the 'auth/signup' endpoint.
  signup: (params) => axiosClient.post("auth/signup", params),
  // login method sends a POST request to the 'auth/login' endpoint.
  login: (params) => axiosClient.post("auth/login", params),
  // verifyToken method sends a POST request to the 'auth/verify-token' endpoint.
  verifyToken: () => axiosClient.post("auth/verify-token"),
};

export default authApi;
