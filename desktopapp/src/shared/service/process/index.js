import { api } from "../../../api/api";

const processServices = {
  getProcesses: async () => {
    try {
      const req = await api.get(`process`);
      const process = req.data.data;
      return process;
    } catch (error) {
      throw error;
    }
  },
  getProcess: async (id) => {
    try {
      const req = await api.get(`process`, id);
      const process = req.data.data;
      return process;
    } catch (error) {
      throw error;
    }
  },
  createProcess: async (data) => {
    try {
      const req = await api.post(`process`, data);
      const process = req.data.data;
      return process;
    } catch (error) {
      console.error(error.response);
      throw error;
    }
  },
};

export default processServices;
