import { api } from "../../../api/api";

const catalogueServices = {
  createCatalogue: async (data) => {
    try {
      const req = await api.post(`catalogue`, data);
      const caltalogue = req.data.data;
      return caltalogue;
    } catch (error) {
      console.error(error.response);
      throw error;
    }
  },
  createCatalogueHasProcess: async (data) => {
    try {
      const req = await api.post(`catalogue/has`, data);
      const caltalogue = req.data.data;
      return caltalogue;
    } catch (error) {
      console.error(error.response);
      throw error;
    }
  },
};

export default catalogueServices;
