import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setWithData } from "../redux/features/ui/uiSlice";
import { QUERY_KEYS } from "../shared/constants";

import processysServices from "../shared/service/processys";

const Data = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      await processysServices.createProcessys();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const { mutate, isLoading: isLoadingMutation } = useMutation(subtmit, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.PROCESSYS]);
      dispatch(setWithData());
      localStorage.setItem("dataExists", true);
      navigate("/");
    },
  });

  if (isLoadingMutation) return <h1>loading...</h1>;

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
      <h2 className="capitalize font-bold text-2xl mb-10">
        click to get the current processes from your system
      </h2>
      <form onSubmit={mutate}>
        <button
          disabled={isLoadingMutation}
          type="submit"
          className="disabled:bg-gray-700 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Get process
        </button>
      </form>
    </div>
  );
};

export default Data;
