import axiosClient from "./axiosClient";

// Define methods related to board API calls.
const boardApi = {
  create: () => axiosClient.post("boards"),
  getAll: () => axiosClient.get("boards"),
  updatePositoin: (params) => axiosClient.put("boards", params),
  getOne: (id) => axiosClient.get(`boards/${id}`),
  delete: (id) => axiosClient.delete(`boards/${id}`),
  update: (id, params) => axiosClient.put(`boards/${id}`, params),
};

export default boardApi;
