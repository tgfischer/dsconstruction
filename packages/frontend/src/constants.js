export const endpoints = {
  backend: process.env.REACT_APP_BACKEND_ENDPOINT + "/api",
  users: process.env.REACT_APP_USERS_ENDPOINT + "/api",
  photos: process.env.REACT_APP_PHOTOS_ENDPOINT + "/api"
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
