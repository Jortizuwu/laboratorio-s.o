import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { useDefaultValues, schema } from "./utils/form-props";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { closeAndOpenModal } from "../../../redux/features/ui/uiSlice";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");

export const ModalCreate = () => {
  const dispatch = useDispatch();
  const { modalIsOpen } = useSelector((state) => state.ui);
  const { process } = useSelector((state) => state.process);

  const {
    submit,
    isLoading,
    formValues: { defaultValues },
  } = useDefaultValues();

  const {
    handleSubmit,
    reset,
    formState: { errors },
    register,
  } = useForm({
    mode: "all",
    initialValues: defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => dispatch(closeAndOpenModal())}
      style={customStyles}
      closeTimeoutMS={200}
      overlayClassName="modal-fondo"
    >
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col space-y-4 w-64 sm:w-80 h-auto"
      >
        <h1 className="font-bold font-neucha text-center text-2xl text-gray-500">
          Create Catalogue
        </h1>

        <div className="flex flex-col ">
          <div className="col-span-6 space-y-2 sm:col-span-4">
            <div className="col-span-3 sm:col-span-2">
              <label
                htmlFor="company-website"
                className="block text-sm mb-2 font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                className="input"
                placeholder="Catalogue name"
                {...register("title")}
              />
              {errors?.title && (
                <div className="mt-4 bg-red-500 w-full max-w-xs h-20 text-center flex justify-center items-center rounded text-lg font-semibold text-white mb-3 p-4">
                  {errors?.title?.message}
                </div>
              )}
              <div>
                <label
                  htmlFor="company-website"
                  className="block text-sm mb-2 font-medium text-gray-700 mt-2"
                >
                  PID of the processes to be loaded
                </label>

                <section className="flex flex-row">
                  {process?.map((el, idx) => (
                    <p key={el.pid + idx}>{el.pid},</p>
                  ))}
                </section>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="px-2 py-2 w-full text-white font-semibold mx-auto bg-purple-500 hover:bg-purple-600 focus:ring-4 rounded-md transform focus:scale-105 transition duration-200"
        >
          {!isLoading ? "subir" : "subiendo espere"}
        </button>
      </form>
    </Modal>
  );
};
