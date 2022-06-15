import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { closeAndOpenModal } from "../../../../redux/features/ui/uiSlice";

import { QUERY_KEYS } from "../../../../shared/constants";
import catalogueServices from "../../../../shared/service/catalogue";
import processServices from "../../../../shared/service/process";

export const schema = Yup.object().shape({
  title: Yup.string().required("Catalogue title is required!"),
});

const initialValues = {
  title: "",
};

export function useDefaultValues() {
  const queryClient = useQueryClient();
  const { process } = useSelector((state) => state.process);
  const dispatch = useDispatch();

  const create = useCallback(
    async (values) => {
      try {
        const dataProcess = await processServices.createProcess(process);
        const dataCatalogue = await catalogueServices.createCatalogue({
          name: values?.title,
        });

        const processIdArr = dataProcess.map((val) => {
          return val.idProcess;
        });
        await catalogueServices.createCatalogueHasProcess({
          idCatalogue: dataCatalogue.idCatalogue,
          processIdArr,
        });
      } catch (error) {
        console.error(error);
      }
    },
    [process]
  );

  const { mutate, isLoading: isLoadingMutation } = useMutation(create, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.CATALOGUE]);
      dispatch(closeAndOpenModal());
    },
  });

  return {
    isLoading: isLoadingMutation,
    submit: mutate,
    formValues: {
      defaultValues: initialValues,
      formProps: {},
    },
  };
}
