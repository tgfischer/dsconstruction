import { HomePageSettings } from "./HomePageSettings";
import { ContactPageSettings } from "./ContactPageSettings";

export const links = [
  {
    displayName: "Home",
    url: "/dashboard/home",
    Component: HomePageSettings
  },
  {
    displayName: "Photo Gallery",
    url: "/dashboard/gallery",
    Component: HomePageSettings
  },
  {
    displayName: "Contact",
    url: "/dashboard/contact",
    Component: ContactPageSettings
  },
  {
    displayName: "Services",
    url: "/dashboard/services",
    Component: HomePageSettings
  },
  {
    displayName: "Users",
    url: "/dashboard/users",
    Component: HomePageSettings
  }
];
