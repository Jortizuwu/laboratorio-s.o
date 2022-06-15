import processServices from "../../../service/process";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "../../../constants/index";
import { useParams } from "react-router-dom";

export function useGetProcess() {
  const params = useParams();

  const { data: process, isLoading } = useQuery(
    [QUERY_KEYS.PROCESS, params.id],
    () => processServices.getProcess(params.id),
    {
      enabled: !!params.id,
    }
  );

  return {
    process,
    isLoading,
  };
}

export function useGetProcesses() {
  const { data: processes = [], isLoading } = useQuery(QUERY_KEYS.PROCESS, () =>
    processServices.getProcesses()
  );
  return {
    processes,
    isLoading,
  };
}
