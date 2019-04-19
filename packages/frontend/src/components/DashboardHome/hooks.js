import { useContext } from "react";
import { useSnackbar } from "notistack";

import { HomeContext } from "../../contexts/HomeProvider";
import { endpoints } from "../../constants";
import useRequest from "../../hooks/useRequest";
import useUser from "../../hooks/useUser";

export const useDashboardHome = () => {
  const [state] = useContext(HomeContext);
  const { idToken } = useUser();
  const { enqueueSnackbar } = useSnackbar();
  const [{ isLoading: isSubmitting }, handleSubmit] = useRequest(
    ({ isLoading, photos, services, ...data }) => ({
      method: "POST",
      url: `${endpoints.backend}/home`,
      data,
      headers: {
        Authorization: idToken
      }
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
