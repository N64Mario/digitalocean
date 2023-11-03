import { log } from "console";
import linkService from "../../services/linkService";
import ApiResponseHandler from "../apiResponseHandler";

export default async (req: any, res: any, next: any) => {
  try {
    await linkService.update(req.body.data);
    await ApiResponseHandler.success(req, res, "");
  } catch (error) {}
};
