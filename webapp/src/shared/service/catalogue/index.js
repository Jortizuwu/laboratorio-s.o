import { api } from "../../../api/api";

const catalogueServices = {
  getCatalogues: async () => {
    try {
      const req = await api.get(`catalogue`);
      const catalogues = req.data.Catalogs;
      return catalogues;
    } catch (error) {
      console.error(error.response);
      throw error;
    }
  },
  getCatalogue: async (id) => {
    try {
      const req = await api.get(`catalogue/${id}`);
      const catalogue = req.data.catalogue;
      return catalogue;
    } catch (error) {
      console.error(error.response);
      throw error;
    }
  },
};

export default catalogueServices;
