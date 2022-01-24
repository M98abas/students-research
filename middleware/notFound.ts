import { errRes } from "../util/util.service";

export default (req: any, res: any, next: any) => {
  return errRes(res, `Not Found`, 404);
};
