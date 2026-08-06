import { Application } from "../src/core/application/Application.js";
import appRoutes from "./routes/routes.js";

const app = Application.create();

app
  .routes([appRoutes])
  .run(4000, () => console.log("Node is running on port 4000"));
