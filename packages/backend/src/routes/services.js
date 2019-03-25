import express from "express";
import HttpStatus from "http-status-codes";

const router = express.Router({ mergeParams: true });

const services = (req, res) => {
  return res.status(HttpStatus.OK).json({
    services: [
      {
        name: "Service 1",
        blurb:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat tellus vel neque ullamcorper, vel faucibus metus auctor.",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat tellus vel neque ullamcorper, vel faucibus metus auctor. Aenean ac laoreet mauris, vitae ornare nulla. Vivamus elementum tellus at hendrerit facilisis. Pellentesque eleifend ligula ut elit tempus ultrices. Proin id libero in justo dignissim rutrum sit amet non massa. Vivamus feugiat eros id nisl laoreet, non sagittis dui condimentum. Aenean elementum lacus sed nisl condimentum sodales. Donec ullamcorper turpis nec cursus finibus. Vivamus sed varius tortor. Fusce ultricies vel ante at vehicula. Morbi sit amet commodo leo. Duis ligula ante, auctor a pharetra a, mattis sed ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean mauris erat, tempor dignissim tristique tincidunt, maximus non sapien. Fusce hendrerit tortor vel felis consectetur lobortis.",
        thumbnail: "/static/images/thumbnail.jpg",
        to: "/services/service"
      },
      {
        name: "Service 2",
        blurb:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat tellus vel neque ullamcorper, vel faucibus metus auctor.",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat tellus vel neque ullamcorper, vel faucibus metus auctor. Aenean ac laoreet mauris, vitae ornare nulla. Vivamus elementum tellus at hendrerit facilisis. Pellentesque eleifend ligula ut elit tempus ultrices. Proin id libero in justo dignissim rutrum sit amet non massa. Vivamus feugiat eros id nisl laoreet, non sagittis dui condimentum. Aenean elementum lacus sed nisl condimentum sodales. Donec ullamcorper turpis nec cursus finibus. Vivamus sed varius tortor. Fusce ultricies vel ante at vehicula. Morbi sit amet commodo leo. Duis ligula ante, auctor a pharetra a, mattis sed ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean mauris erat, tempor dignissim tristique tincidunt, maximus non sapien. Fusce hendrerit tortor vel felis consectetur lobortis.",
        thumbnail: "/static/images/thumbnail.jpg",
        to: "/services/service"
      },
      {
        name: "Service 3",
        blurb:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat tellus vel neque ullamcorper, vel faucibus metus auctor.",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat tellus vel neque ullamcorper, vel faucibus metus auctor. Aenean ac laoreet mauris, vitae ornare nulla. Vivamus elementum tellus at hendrerit facilisis. Pellentesque eleifend ligula ut elit tempus ultrices. Proin id libero in justo dignissim rutrum sit amet non massa. Vivamus feugiat eros id nisl laoreet, non sagittis dui condimentum. Aenean elementum lacus sed nisl condimentum sodales. Donec ullamcorper turpis nec cursus finibus. Vivamus sed varius tortor. Fusce ultricies vel ante at vehicula. Morbi sit amet commodo leo. Duis ligula ante, auctor a pharetra a, mattis sed ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean mauris erat, tempor dignissim tristique tincidunt, maximus non sapien. Fusce hendrerit tortor vel felis consectetur lobortis.",
        thumbnail: "/static/images/thumbnail.jpg",
        to: "/services/service"
      }
    ]
  });
};

router.get("/", services);

export default router;
