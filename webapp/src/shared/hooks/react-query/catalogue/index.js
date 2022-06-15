import catalogueServices from "../../../service/catalogue";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "../../../constants/index";
import { useParams } from "react-router-dom";

export function useGetCatalogue() {
  const params = useParams();

  const { data: catalogue, isLoading } = useQuery(
    [QUERY_KEYS.PROCESS, params.id],
    () => catalogueServices.getCatalogue(params.id),
    {
      enabled: !!params.id,
    }
  );

  return {
    catalogue,
    isLoading,
  };
}

export function useGetCatalogues() {
  const { data: catalogues = [], isLoading } = useQuery(
    QUERY_KEYS.CATALOGUE,
    () => catalogueServices.getCatalogues()
  );
  return {
    catalogues,
    isLoading,
  };
}
