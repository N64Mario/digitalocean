import { log } from "console";
import linkService from "../../services/linkService";
import ApiResponseHandler from "../apiResponseHandler";

export default async (req: any, res: any, next: any) => {
  try {
    const payload = await linkService.getId(req.params.id);
    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {}
};
