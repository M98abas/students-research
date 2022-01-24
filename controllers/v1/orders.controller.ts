import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { errRes, okRes } from "../../util/util.service";
import { validate } from "validate.js";
import Validate from "../../util/validation";
// import env from "dotenv";
// const imgbbUploader = require("imgbb-uploader");

const prisma = new PrismaClient();

export default class WebActionsResponse {
  /**
   * @param req
   * @param res
   * @returns
   */
  // req get all
  static async getAll(req: Request, res: Response): Promise<object> {
    const product = await prisma.orders.findMany({
      where: {
        active: true,
      },
      include: {
        customer: true,
        orders: {
          include: {
            product: true,
          },
        },
      },
    });
    if (product.length != 0) return okRes(res, product);
    return errRes(res, "No words in stock now!!");
  }

  /**
   * @param req
   * @param res
   * @returns
   */
  static async add(req: any, res: any): Promise<object> {
    // get body
    const [user] = req.user;
    // console.log("ussssssssssssssssssssssssssser", user);
    const body = req.body;
    let notValidated = validate(body, Validate.orders());
    if (!notValidated)
      return errRes(
        res,
        "You have been sent an empty string please try again!!!"
      );
    let lang = req.query.lang;
    if (body.cart.length < 1) return errRes(res, "emptyCart", 400, lang);
    let total = 0;
    let items = [];
    for (const item of body.cart) {
      let notValid = validate(item, Validate.cart());
      if (notValid) return errRes(res, notValid);

      // get the product from the db
      // check if id exist & qantity avalible  -> if not error
      let product = await prisma.products.findFirst({ where: { id: item.id } });
      if (!product) return errRes(res, `product ${item.id} not found`, 404);
      if (product.stock < item.quantity)
        return errRes(res, `product ${item.id} out of stock`);
      else {
        let finalStock = product.stock - item.quantity;
        product = await prisma.products.update({
          where: {
            id: item.id,
          },
          data: {
            stock: finalStock,
          },
        });
      }
      // calculate the total
      total = total + product.price * item.quantity;
      items.push({ ...product, q: item.quantity });
    }
    let orderItem: any;
    for (const item of items) {
      let res = item.price * item.q;
      orderItem = {
        product_id: item.id,
        total_cost: res,
        quantity: item.q,
      };
    }
    // orderItem = [orderItem];
    // console.log(orderItem);
    // save body
    let dataOrder = body;
    dataOrder = await prisma.orders.create({
      data: {
        amount: dataOrder.amount,
        total_cost: dataOrder.total_cost,
        order_status: dataOrder.order_status,
        customer_id: user.id,
        orders: { create: orderItem },
      },
    });

    // await orderItem.save();
    return okRes(res, { dataOrder, orderItem });
  }

  /**
   * @param req
   * @param res
   * @returns
   */
  // req get all
  static async getOne(req: Request, res: Response): Promise<object> {
    let id = parseInt(req.params.id);

    const order = await prisma.orders.findMany({
      where: {
        id,
      },
    });
    if (order.length != 0) return okRes(res, order);
    return errRes(res, "No words in stock now!!");
  }

  /**
   * @param req
   * @param res
   * @returns
   */
  // req get all
  static async getMyOrders(req: any, res: any): Promise<object> {
    let user = req.user;

    const order = await prisma.customers.findMany({
      where: {
        email: user.email,
      },
      include: {
        orders: true,
      },
    });
    if (order.length != 0) return okRes(res, order);
    return errRes(res, "No orders in the cart !!");
  }
  /**
   * @param req
   * @param res
   * @returns
   */
  // req get all
  static async update(req: Request, res: Response): Promise<object> {
    // get body
    const body = req.body;
    let notValidated = validate(body, Validate.products(false));
    if (!notValidated)
      return errRes(
        res,
        "You have been sent an empty string please try again!!!"
      );
    let total = 0;
    let items = [];
    for (const item of body.cart) {
      let notValid = validate(item, Validate.cart());
      if (notValid) return errRes(res, notValid);

      // get the product from the db
      // check if id exist & qantity avalible  -> if not error
      let product = await prisma.products.findFirst({ where: { id: item.id } });
      if (!product) return errRes(res, `product ${item.id} not found`, 404);
      if (product.stock < item.quantity)
        return errRes(res, `product ${item.id} out of stock`);
      // calculate the total
      total = total + product.price * item.quantity;
      items.push({ ...product, q: item.quantity });
    }
    let orderItem: any;
    for (const item of items) {
      orderItem = {
        product_id: item.id,
        total_cost: item.price * item.q,
        quantity: item.q,
      };
    }
    // save body
    let dataOrder = body;
    dataOrder = await prisma.orders.update({
      where: {
        id: body.id,
      },
      data: {
        amount: dataOrder.amount,
        total_cost: dataOrder.total_cost,
        order_date: dataOrder.order_date,
        order_status: dataOrder.order_status,
        orders: orderItem,
      },
    });
    return okRes(res, res.json(dataOrder));
  }

  /**
   * @param req
   * @param res
   * @returns
   */
  static async delete(req: Request, res: Response): Promise<object> {
    // get body
    const body = req.body;
    let notValidated = validate(body, Validate.category(false));
    if (!notValidated)
      return errRes(
        res,
        "You have been sent an empty string please try again!!!"
      );
    let dataOrder = body;
    dataOrder = await prisma.orders.update({
      where: { id: body.id },
      data: {
        active: dataOrder.active,
      },
    });
    return okRes(res, res.json(dataOrder));
  }
}
