import express from "express";
import HttpStatus from "http-status-codes";

import * as client from "../clients/settings";

const router = express.Router({ mergeParams: true });

const info = async (req, res) => {
  const contact = await client.get("contact");
  return res.status(HttpStatus.OK).json({ contact });
};

router.get("/", info);

export default router;
