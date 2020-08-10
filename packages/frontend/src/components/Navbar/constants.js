import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";

export const links = [
  {
    displayName: "Home",
    url: "/",
    isVisible: true,
    variant: "link"
  },
  {
    displayName: "Photo Gallery",
    url: "/gallery?page=0&size=16",
    isVisible: true,
    variant: "link"
  },
  {
    displayName: "Contact",
    url: "/contact",
    isVisible: true,
    variant: "link"
  },
  {
    displayName: "Dashboard",
    url: "/dashboard",
    isLoggedIn: true,
    variant: "link"
  }
];

export const social = [
  {
    icon: faFacebookSquare,
    url: "https://www.facebook.com/Ds-Construction-1400202433581118"
  }
];
