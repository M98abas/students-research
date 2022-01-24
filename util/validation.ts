export default class Validate {
  constructor(parameters: any) {}
  static register = (must = true) => ({
    email: {
      presence: must,
      type: "string",
    },
    nickname: {
      presence: must,
      type: "string",
    },
    password: {
      presence: must,
      type: "string",
    },
  });

  static registerCust = (must = true) => ({
    email: {
      presence: must,
      type: "string",
    },
    fullname: {
      presence: must,
      type: "string",
    },
    city: {
      presence: must,
      type: "string",
    },
    address: {
      presence: must,
      type: "string",
    },
    phone: {
      presence: must,
      type: "string",
    },
    password: {
      presence: must,
      type: "string",
    },
  });
  static login = (must = true) => ({
    email: {
      presence: must,
      type: "string",
    },
    password: {
      presence: must,
      type: "string",
    },
  });
  static products = (must = true) => ({
    name: {
      presence: must,
      type: "string",
    },
    price: {
      presence: must,
      type: "integer",
    },
    description: {
      presence: false,
      type: "string",
    },
    image: {
      presence: must,
      type: "string",
    },
    stock: {
      presence: must,
      type: "integer",
    },
    category_id: {
      presence: must,
      type: "integer",
    },
  });
  static orders = (must = true) => ({
    amount: {
      presence: must,
      type: "integer",
    },
    totle_cost: {
      presence: must,
      type: "integer",
    },
    order_status: {
      presence: must,
      type: "string",
    },
    total_cost: {
      presence: must,
      type: "string",
    },
  });
  static category = (must = true) => ({
    name: {
      presence: must,
      type: "string",
    },
    description: {
      presence: false,
      type: "string",
    },
  });
  static cart = (must = true) => ({
    quantity: {
      presence: must,
      type: "integer",
    },
  });
}
