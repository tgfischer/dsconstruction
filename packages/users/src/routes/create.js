import express from "express";
import HttpStatus from "http-status-codes";
import asyncHandler from "express-async-handler";

import * as client from "../client";

const router = express.Router({ mergeParams: true });

const create = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const result = await client.createUser(firstName, lastName, email, password);
  res.status(HttpStatus.OK).json(result);
};

router.post("/", asyncHandler(create));

export default router;
