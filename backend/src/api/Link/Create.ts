import { log } from "console";
import linkService from "../../services/linkService";
import ApiResponseHandler from "../apiResponseHandler";

export default async (req: any, res: any, next: any) => {
  try {
    const data = req.body.data;
    const payload = await linkService.save(data.form, data.idDoc);
    await ApiResponseHandler.success(req, res, "payload");
  } catch (error) {}
};
