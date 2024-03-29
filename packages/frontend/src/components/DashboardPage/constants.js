import { HomePageSettings } from "./HomePageSettings";
import { GalleryPageSettings } from "./GalleryPageSettings";
import { ContactPageSettings } from "./ContactPageSettings";
import { ServicesSettings } from "./ServicesSettings";
import { UsersSettings } from "./UsersSettings";

export const links = [
  {
    displayName: "Home",
    url: "/dashboard/home",
    Component: HomePageSettings
  },
  {
    displayName: "Photo Gallery",
    url: "/dashboard/gallery",
    params: {
      page: 0,
      size: 9
    },
    Component: GalleryPageSettings
  },
  {
    displayName: "Contact",
    url: "/dashboard/contact",
    Component: ContactPageSettings
  },
  {
    displayName: "Services",
    url: "/dashboard/services",
    Component: ServicesSettings
  },
  {
    displayName: "Users",
    url: "/dashboard/users",
    Component: UsersSettings
  }
];
