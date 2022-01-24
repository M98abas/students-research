import { errRes } from "../util/util.service";
import CONFIG from "../config";
import * as jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: any, res: any, next: any) => {
  //get token
  let token = req.headers.token;
  if (!token) return errRes(res, "You need to authenticate");
  // verfiy token
  try {
    let payload: any;
    payload = jwt.verify(token, CONFIG.jwtUserSecret);

    let admin: any = await prisma.admin.findUnique({
      where: { email: payload.email },
    });
    req.admin = admin;
    return next();
  } catch (error) {
    return errRes(res, "invalid token");
  }
};
