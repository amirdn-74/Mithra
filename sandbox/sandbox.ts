import { Application } from "../src/core/application/Application.js";
import { Route } from "../src/core/http/Route.js";

const app = Application.create();

const route = new Route();

route.get("/", (req, res) => {});
route.post("/", (req, res) => {});
route.get("/test", (req, res) => {});

route.group(() => {
    route.patch('/group-test', () => {});
});

route.get('/after-group', () => {});

route.peek();
