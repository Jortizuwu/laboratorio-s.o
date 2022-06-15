import { useCallback, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setWithData } from "../redux/features/ui/uiSlice";
import { QUERY_KEYS } from "../shared/constants";

import processysServices from "../shared/service/processys";

const Data = () => {
  const [file, setFile] = useState(null);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getPathFile = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files?.["0"]);
    }
  };

  const subtmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await processysServices.createProcessys({ path: file?.path });
      } catch (error) {
        console.log(error);
      }
    },
    [file]
  );

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
    <div className="w-screen h-screen">
      <form onSubmit={mutate}>
        <label className="block text-sm font-medium text-gray-700">
          upload file
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                <span>Upload a file</span>
                <input
                  type="file"
                  className="hidden"
                  multiple={false}
                  onChange={getPathFile}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">TXT up to</p>
          </div>
        </div>
        <div className="px-4 py-3 text-right sm:px-6">
          <button
            disabled={!file ? true : false || isLoadingMutation}
            type="submit"
            className="disabled:bg-gray-700 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Data;
