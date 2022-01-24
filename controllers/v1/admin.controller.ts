import { Request, Response } from "express";
import { errRes, okRes } from "../../util/util.service";
import Validate from "../../util/validation";
import { validate } from "validate.js";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import CONFIG from "../../config";
import { PrismaClient } from "@prisma/client";
import orders from "../../routes/activties/orders";

const prisma = new PrismaClient();

export default class AdminController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getAllCoustomers(req: Request, res: Response): Promise<object> {
    const cust = await prisma.customers.findMany({
      where: { active: true },
      include: {
        orders: {
          include: {
            orders: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });
    return res.json(cust);
  }
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getAllUsers(req: Request, res: Response): Promise<object> {
    const users = await prisma.admin.findMany({ where: { active: true } });
    return res.json(users);
  }
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async rigister(req: Request, res: Response): Promise<object> {
    //body
    const body = req.body;

    // validation
    let notValid = validate(body, Validate.register());
    if (notValid) return errRes(res, notValid);
    let email = body.email;
    // hash passowrd
    let salt = await bcrypt.genSalt(12);
    let password = await bcrypt.hash(body.password, salt);
    body.password = password;
    //check if user already exists
    let admin: any = await prisma.admin.findUnique({
      where: { email: body.email },
    });
    if (admin) {
      return errRes(res, `admin ${email} already exists`);
    } else {
      admin = await prisma.admin.create({
        data: {
          email: body.email,
          nickname: body.nickname,
          password: body.password,
        },
      });
    }
    let token = jwt.sign({ email: admin.email }, CONFIG.jwtUserSecret);
    return okRes(res, { token });
  }
  /**
   * @param req
   * @param res
   * @returns
   */
  static async login(req: Request, res: Response): Promise<object> {
    // get body
    let body = req.body;
    // console.log(body);
    // validate body
    let notValid = validate(body, Validate.login());
    if (notValid) return errRes(res, notValid);
    // compare password
    let admin: any = await prisma.admin.findUnique({
      where: {
        email: body.email,
      },
    });
    if (!admin) return errRes(res, `the email ${body.email} not exsist`);
    let check = await bcrypt.compare(body.password, admin.password);
    if (!check)
      return errRes(
        res,
        "the password that you entered is wrong, please try again"
      );
    // return the token
    let token = jwt.sign({ email: admin.email }, CONFIG.jwtUserSecret);
    return okRes(res, { token });
  }
}
