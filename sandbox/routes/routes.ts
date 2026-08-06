import { Router } from "../../src/core/routing/Router.js";
import { HomeController } from "../controllers/HomeController.js";
import { TestMiddleware } from "../middlewares/TestMiddleware.js";

const appRoutes = new Router();

const homeController = new HomeController();

appRoutes
  .prefix("/ssss")
  .middleware(TestMiddleware)
  .name("test.")
  .group(() => {
    appRoutes
      .middleware([TestMiddleware])
      .prefix("/pre")
      .get("/home", homeController.index)
      .name("afteri");
  });

export default appRoutes;
