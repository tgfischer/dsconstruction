import express from "express";
import HttpStatus from "http-status-codes";
import asyncHandler from "express-async-handler";
import { validate } from "@tomfischer/middleware";

import * as client from "../client";
import * as schemas from "../schemas/users";

const router = express.Router({ mergeParams: true });

const get = async (req, res) => {
  const users = await client.getUsers();
  res.status(HttpStatus.OK).json({ users });
};

const add = async (req, res) => {
  const { firstName, lastName, email, password } = res.locals.body;
  await client.createUser(firstName, lastName, email, password);
  res.status(HttpStatus.OK).json({ success: true });
};

const destroy = async (req, res) => {
  await client.deleteUsers(res.locals.body);
  res.status(HttpStatus.OK).json({ success: true });
};

router.get("/", asyncHandler(get));

router.post("/", validate(schemas.add, "body"), asyncHandler(add));

router.delete("/", validate(schemas.destroy, "body"), asyncHandler(destroy));

export default router;
