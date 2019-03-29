import SettingsIcon from "@material-ui/icons/Settings";
import HomeIcon from "@material-ui/icons/Home";
import CollectionsIcon from "@material-ui/icons/Collections";
import BuildIcon from "@material-ui/icons/Build";
import PhoneIcon from "@material-ui/icons/Phone";

export const items = {
  SETTINGS: {
    icon: SettingsIcon,
    name: "Settings",
    to: "/dashboard/settings"
  },
  HOME: {
    icon: HomeIcon,
    name: "Home",
    to: "/dashboard/home"
  },
  SERVICES: {
    icon: BuildIcon,
    name: "Services",
    to: "/dashboard/services"
  },
  GALLERY: {
    icon: CollectionsIcon,
    name: "Gallery",
    to: "/dashboard/gallery"
  },
  CONTACT: {
    icon: PhoneIcon,
    name: "Contact",
    to: "/dashboard/contact"
  }
};
