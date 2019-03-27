export const endpoints = {
  backend: process.env.BACKEND_ENDPOINT,
  users: process.env.USERS_ENDPOINT
};

export const defaultHeaders = {
  "Cache-Control": "no-cache",
  "Content-Type": "application/json"
};

export const pages = [
  {
    label: "Home",
    href: "/"
  },
  {
    label: "About",
    href: "/about"
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
