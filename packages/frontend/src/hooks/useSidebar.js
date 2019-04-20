import { useContext } from "react";

import { SidebarContext } from "../contexts/SidebarProvider";

export default () => {
  const [isOpen, setIsOpen] = useContext(SidebarContext);
  return [isOpen, () => setIsOpen(true), () => setIsOpen(false)];
};
