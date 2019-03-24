import express from "express";
import HttpStatus from "http-status-codes";

const router = express.Router({ mergeParams: true });

const home = (req, res) => {
  return res.status(HttpStatus.OK).json({
    home: {
      masthead: {
        background: "/static/images/placeholder.jpg"
      }
    }
  });
};

router.get("/", home);

export default router;
