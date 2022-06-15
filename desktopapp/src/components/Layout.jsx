import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import { closeAndOpenModal } from "../redux/features/ui/uiSlice";
import Navbar from "./Navbar";

const Index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataExist = localStorage.getItem("dataExists");
  const { process } = useSelector((state) => state.process);

  return (
    <div className="h-screen">
      <Navbar />
      <header className="bg-white shadow flex justify-between p-10">
        <h1 className="text-3xl font-bold text-gray-900">System processes</h1>
        {dataExist === "true" && (
          <div>
            <button
              className="hover:bg-slate-100 cursor-pointer hover:text-green-400 transition-all bg-green-400 p-1 md:p-2 font-bold text-white rounded-lg "
              onClick={() => dispatch(closeAndOpenModal())}
              disabled={process.length > 0 ? false : true}
            >
              Create Catalogue
            </button>
            <button
              className="hover:bg-slate-100 ml-4 cursor-pointer hover:text-blue-400 transition-all bg-blue-300 p-1 md:p-2 font-bold text-white rounded-lg "
              onClick={() => {
                localStorage.setItem("dataExists", false);
                navigate("/");
              }}
            >
              Load new processes list
            </button>
          </div>
        )}
      </header>
      <main className="p-10 flex items-center w-full justify-center">
        <Outlet />
      </main>
    </div>
  );
};

export default Index;
