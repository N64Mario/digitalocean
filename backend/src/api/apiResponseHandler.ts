class ApiResponseHandler {
  static success(req, res, payload) {
    if (payload !== undefined) {
      return res.status(200).send(payload);
    } else {
      res.status(200);
    }
  }
  static Error(req, res, error) {
    if (error && [400, 401, 403, 404].includes(error.code)) {
      res.status(error.code).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
}

export default ApiResponseHandler;
