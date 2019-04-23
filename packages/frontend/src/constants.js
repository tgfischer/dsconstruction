import HomeIcon from "@material-ui/icons/Home";
import CollectionsIcon from "@material-ui/icons/Collections";
import BuildIcon from "@material-ui/icons/Build";
import PhoneIcon from "@material-ui/icons/Phone";
import PersonIcon from "@material-ui/icons/Person";

export const endpoints = {
  backend: process.env.REACT_APP_BACKEND_ENDPOINT + "/api",
  users: process.env.REACT_APP_USERS_ENDPOINT + "/api"
};

export const pages = {
  HOME: {
    icon: HomeIcon,
    name: "Home",
    to: "/home"
  },
  GALLERY: {
    icon: CollectionsIcon,
    name: "Gallery",
    to: "/gallery"
  },
  CONTACT: {
    icon: PhoneIcon,
    name: "Contact",
    to: "/contact"
  }
};

export const adminPages = {
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
  },
  USERS: {
    icon: PersonIcon,
    name: "Users",
    to: "/dashboard/users"
  }
};
