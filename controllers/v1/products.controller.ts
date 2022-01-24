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
    const product = await prisma.products.findMany({
      where: {
        active: true,
      },
    });
    if (product.length != 0) return okRes(res, product);
    return errRes(res, "No products in stock now!!");
  }

  /**
   * @param req
   * @param res
   * @returns
   */
  // req get all
  static async getAllOneCategories(
    req: Request,
    res: Response
  ): Promise<object> {
    let id = parseInt(req.params.id);
    const category = await prisma.categories.findMany({
      where: {
        active: true,
        id,
      },
      include: {
        products: true,
      },
    });
    if (category.length != 0) return okRes(res, category);
    return errRes(res, "No categorys in stock now!!");
  }
  /**
   * @param req
   * @param res
   * @returns
   */
  // req get all
  static async getAllCategories(req: Request, res: Response): Promise<object> {
    const category = await prisma.categories.findMany({
      where: {
        active: true,
      },
      include: {
        products: true,
      },
    });
    if (category.length != 0) return okRes(res, category);
    return errRes(res, "No categorys in stock now!!");
  }
  /**
   * @param req
   * @param res
   * @returns
   */
  static async addProducts(req: Request, res: Response): Promise<object> {
    // get body
    const body = req.body;
    let categoryID: any = parseInt(body.category_id);
    let notValidated = validate(body, Validate.products());
    if (!notValidated)
      return errRes(
        res,
        "You have been sent an empty string please try again!!!"
      );
    // save body
    let dataValue = body;
    dataValue = await prisma.products.create({
      data: {
        name: dataValue.name,
        description: dataValue.description,
        price: dataValue.price,
        stock: dataValue.stock,
        category_id: categoryID,
        image: dataValue.image,
      },
    });
    return okRes(res, res.json(dataValue));
  }
  /**
   * @param req
   * @param res
   * @returns
   */
  static async addCategory(req: Request, res: Response): Promise<object> {
    // get body
    const body = req.body;
    let notValidated = validate(body.name, Validate.category());
    // console.log(body.name, body.description);
    if (notValidated)
      return errRes(
        res,
        "You have been sent an empty string please try again!!!"
      );
    // save body
    // let dataValue = body;
    await prisma.categories.create({
      data: {
        name: body.name,
        description: body.description,
      },
    });
    return okRes(res, res.json(body));
  }
  /**
   * @param req
   * @param res
   * @returns
   */
  // req get all
  static async getOneProducts(req: Request, res: Response): Promise<object> {
    let id = parseInt(req.params.id);
    let product: any;
    try {
      product = await prisma.products.findMany({
        where: {
          id: id,
        },
        include: {
          orders: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
    if (product.length != 0) return okRes(res, product);
    return errRes(res, "No words in stock now!!");
  }

  /**
   * @param req
   * @param res
   * @returns
   */
  // req get all
  static async updateProducts(req: Request, res: Response): Promise<object> {
    // get body
    const body = req.body;
    let id = parseInt(req.params.id);
    let notValidated = validate(body, Validate.products(false));
    // console.log({ notValidated, body });

    if (notValidated)
      return errRes(
        res,
        "You have been sent an empty string please try again!!!"
      );
    let dataValue = body;
    await prisma.products.update({
      where: { id },
      data: {
        name: dataValue.name,
        price: dataValue.price,
        description: dataValue.description,
        image: dataValue.image,
        stock: dataValue.stock,
        category_id: dataValue.category_id,
        active: dataValue.active,
      },
    });
    return okRes(res, res.json(dataValue));
  }

  /**
   * @param req
   * @param res
   * @returns
   */
  static async updateCategory(req: Request, res: Response): Promise<object> {
    // get body
    let id = parseInt(req.params.id);

    const body = req.body;
    let notValidated = validate(body, Validate.category(false));
    if (notValidated)
      return errRes(
        res,
        "You have been sent an empty string please try again!!!"
      );
    let dataValue = body;
    dataValue = await prisma.categories.update({
      where: { id },
      data: {
        name: dataValue.name,
        description: dataValue.description,
      },
    });
    return okRes(res, res.json(dataValue));
  }
  /**
   * @param req
   * @param res
   * @returns
   */
  static async deleteCategory(req: Request, res: Response): Promise<object> {
    // get body
    let id = parseInt(req.params.id);
    const body = req.body;
    let notValidated = validate(body, Validate.category(false));
    if (notValidated)
      return errRes(
        res,
        "You have been sent an empty string please try again!!!"
      );
    let dataValue = body;
    dataValue = await prisma.categories.update({
      where: { id },
      data: {
        active: false,
      },
    });
    return okRes(res, res.json(dataValue));
  }
  /**
   * @param req
   * @param res
   * @returns
   */
  static async deleteProducts(req: Request, res: Response): Promise<object> {
    // get body
    let id = parseInt(req.params.id);
    let dataValue: any;
    try {
      dataValue = await prisma.products.update({
        where: { id },
        data: {
          active: false,
        },
      });
      return okRes(res, res.json(dataValue));
    } catch (error) {
      return errRes(res, error);
    }
  }
}
