import processysServices from "../../../service/processys";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "../../../constants/index";

// export function useGetProcesys() {
//   const params = useParams();

//   const { data: processys, isLoading } = useQuery(
//     [QUERY_KEYS.PROCESS, params.id],
//     () => processysServices.getProcesys(params.id),
//     {
//       enabled: !!params.id,
//     }
//   );

//   return {
//     processys,
//     isLoading,
//   };
// }

export function useGetProcessys() {
  const { data: processys = [], isLoading } = useQuery(QUERY_KEYS.PROCESS, () =>
    processysServices.getProcessys()
  );
  return {
    processys,
    isLoading,
  };
}
