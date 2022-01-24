import { Request, Response } from "express";
import { errRes, okRes } from "../../util/util.service";
import Validate from "../../util/validation";
import { validate } from "validate.js";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import CONFIG from "../../config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class customerController {
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
    let notValid = validate(body, Validate.registerCust());
    if (notValid) return errRes(res, notValid);
    let email = body.email;
    // hash passowrd
    let salt = await bcrypt.genSalt(12);
    let password = await bcrypt.hash(body.password, salt);
    body.password = password;
    //check if user already exists
    let customer: any = await prisma.customers.findUnique({
      where: { email: body.email },
    });
    if (customer) {
      return errRes(res, `customer ${email} already exists`);
    } else {
      customer = await prisma.customers.create({
        data: {
          email: body.email,
          fullname: body.fullname,
          city: body.city,
          address: body.address,
          phone: body.phone,
          password: body.password,
        },
      });
    }
    let token = jwt.sign({ email: customer.email }, CONFIG.jwtUserSecret);
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

    // validate body
    let notValid = validate(body, Validate.login());
    if (notValid) return errRes(res, notValid);
    // compare password
    let customer: any = await prisma.customers.findUnique({
      where: {
        email: body.email,
      },
    });
    if (!customer) return errRes(res, `the email ${body.email} not exsist`);
    let check = await bcrypt.compare(body.password, customer.password);
    let fullname = customer.fullname;
    if (!check)
      return errRes(
        res,
        "the password that you entered is wrong, please try again"
      );
    // return the token
    let token = jwt.sign({ email: customer.email }, CONFIG.jwtUserSecret);
    return okRes(res, { token, fullname });
  }
}
