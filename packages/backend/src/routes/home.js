import express from "express";
import HttpStatus from "http-status-codes";

import * as client from "../clients/settings";

const router = express.Router({ mergeParams: true });

const home = async (req, res) => {
  const home = await client.get("home");
  return res.status(HttpStatus.OK).json({ home });
};

router.get("/", home);

export default router;
