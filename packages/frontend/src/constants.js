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
    label: "Services",
    href: "/services"
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
