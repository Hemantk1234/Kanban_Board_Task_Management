import axios from "axios";
import queryString from "query-string";

// Define the base URL for your API
const baseUrl = "http://127.0.0.1:5000/api/v1/";
// Function to get the authentication token from local storage
const getToken = () => localStorage.getItem("token");

const axiosClient = axios.create({
  baseURL: baseUrl,
  paramsSerializer: (params) => queryString.stringify({ params }),
});

// Interceptor to modify request configuration before sending
axiosClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json", // Set the content type for requests
      authorization: `Bearer ${getToken()}`, // Attach the authorization token to the headers
    },
  };
});

// Interceptor to handle responses
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    if (!err.response) {
      return alert(err);
    }
    throw err.response;
  }
);

export default axiosClient;
