import { useLocation } from "react-router-dom";

export const useSidebar = ({ links }) => {
  const { pathname } = useLocation();
  return {
    links: links.map(page => ({
      ...page,
      isActive: pathname === page.url
    }))
  };
};
