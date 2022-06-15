import { api } from "../../../api/api";

const processysServices = {
  getProcessys: async () => {
    try {
      const req = await api.get(`processys`);
      const process = req.data.data;
      return process;
    } catch (error) {
      throw error;
    }
  },
  getProcesys: async (id) => {
    try {
      const req = await api.get(`processys`, id);
      const process = req.data.data;
      return process;
    } catch (error) {
      throw error;
    }
  },
  createProcessys: async (data) => {
    try {
      const req = await api.post(`processys`, data);
      const process = req.data.data;
      return process;
    } catch (error) {
      console.error(error.response);
      throw error;
    }
  },
};

export default processysServices;
