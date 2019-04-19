import { useContext } from "react";
import { useSnackbar } from "notistack";

import { HomeContext } from "../../contexts/HomeProvider";
import { endpoints } from "../../constants";
import useRequest from "../../hooks/useRequest";

export const useDashboardHome = () => {
  const [state] = useContext(HomeContext);
  const { enqueueSnackbar } = useSnackbar();
  const [{ isLoading: isSubmitting }, handleSubmit] = useRequest(
    ({ isLoading, gallery, services, ...data }) => ({
      method: "POST",
      url: `${endpoints.backend}/home`,
      data
    }),
    () =>
      enqueueSnackbar("Successfully updated the settings", {
        variant: "success",
        preventDuplicate: true
      })
  );
  return [state, handleSubmit, state.isLoading || isSubmitting];
};

export const useMasthead = () => {
  const [state, setState] = useContext(HomeContext);
  return [
    state.masthead,
    key => e =>
      setState({
        ...state,
        masthead: {
          ...state.masthead,
          [key]: e.target.value
        }
      }),
    state.isLoading
  ];
};

export const useAbout = () => {
  const [state, setState] = useContext(HomeContext);
  return [
    state.about,
    e =>
      setState({
        ...state,
        about: e.target.value
      }),
    state.isLoading
  ];
};
