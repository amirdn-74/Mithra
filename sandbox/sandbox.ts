import { Application } from "../src/core/application/Application.js";
import { Router } from "../src/core/routing/Router.js";
import { TestMiddleware } from "./middlewares/TestMiddleware.js";

const app = Application.create();

const route = new Router();

// route.prefix("sss").get("/", (req, res) => {});

route
  .prefix("/ssss")
  .middleware(TestMiddleware)
  .name("test.")
  .group(() => {
    route
      .middleware([TestMiddleware])
      .prefix("/pre")
      .get("/home", () => {})
      .name("afteri");
  });
