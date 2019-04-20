export const endpoints = {
  backend: process.env.REACT_APP_BACKEND_ENDPOINT + "/api",
  users: process.env.REACT_APP_USERS_ENDPOINT + "/api"
};

export const pages = [
  {
    label: "Home",
    href: "/"
  },
  {
    label: "Gallery",
    href: "/gallery"
  },
  {
    label: "Contact",
    href: "/contact"
  }
];

export const adminPages = [
  {
    label: "Home settings",
    href: "/dashboard/home"
  },
  {
    label: "Services settings",
    href: "/dashboard/services"
  },
  {
    label: "Gallery settings",
    href: "/dashboard/gallery"
  },
  {
    label: "Contact settings",
    href: "/dashboard/contact"
  }
];
