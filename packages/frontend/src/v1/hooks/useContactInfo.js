import { useEffect, useContext } from "react";
import get from "lodash/get";

import useRequest from "./useRequest";
import { ContactContext } from "../contexts/ContactProvider";
import { endpoints } from "../../constants";

export default () => {
  const [state, setState] = useContext(ContactContext);
  const [{ data, isLoading }, getContactInfo] = useRequest(() => ({
    method: "GET",
    url: `${endpoints.backend}/contact`
  }));

  useEffect(() => void setState({ ...state, isLoading: true }), []);
  useEffect(() => void getContactInfo(), []);
  useEffect(() => {
    const contact = get(data, "contact");
    if (contact) {
      setState({ ...state, ...contact, isLoading });
    }
  }, [data, isLoading]);

  return [state];
};
