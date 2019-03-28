/* import { useEffect } from "react";
import { useResource } from "react-request-hook";
import get from "lodash/get";

import { backendEndpoint } from "../../constants"; */

export default ({ size = 20 }) => {
  return [
    Array.from({ length: size }, () => ({
      thumbnail: "/images/thumbnail.jpg",
      original: "/images/placeholder.jpg"
    }))
  ];
  /* const [{ data, isLoading }, getGallery] = useResource(() => ({
    method: "GET",
    url: `${backendEndpoint}/api/gallery/page/${page}/size/${size}`
  }));

  useEffect(() => void getGallery(), []);
  const gallery = get(data, "gallery") || [];
  return [gallery, isLoading]; */
};
