import { errRes } from "../util/util.service";
import * as jwt from "jsonwebtoken";
import CONFIG from "../config";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export default async (req: any, res: any, next: any) => {
  // get the token
  const token = req.headers.token;
  if (!token) return errRes(res, "You need to register");
  // verify token

  try {
    let payload: any;
    payload = jwt.verify(token, CONFIG.jwtUserSecret);
    // get user
    let user: any;
    user = await prisma.customers.findMany({
      where: { email: payload.email },
    });
    // console.log({ user, payload });

    // check user isVerified
    if (user.active) return errRes(res, `Please activate your account`);
    req.user = user;
    // next
    return next();
  } catch (error) {
    return errRes(res, "invalid token");
  }
};
