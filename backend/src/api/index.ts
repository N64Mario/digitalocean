import express from "express";
import cors from "cors";
import bodyparser from "body-parser";
import helmet from "helmet";
import compression from "compression";
import { EventEmitter } from "events";
const myEmitter = new EventEmitter();
myEmitter.setMaxListeners(2000);
const app = express();
app.use(cors({ origin: ["http://138.68.64.63", "*"] }));
app.use(helmet());
app.use(compression());
const routes = express.Router();
app.use(express.json());
require("./Link").default(routes);

// add the helmet verion 4.6.0
app.use("/api", routes);

export default app;
