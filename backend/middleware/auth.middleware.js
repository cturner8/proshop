import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

import User from "../models/user.model.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (e) {
      console.error(e);
      res.status(401);
      throw new Error("Not authozied, token failure");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized");
  }
});

export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("not authorised as an admin");
  }
};
