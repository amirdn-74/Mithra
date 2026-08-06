import { Controller } from "../../src/core/http/Controller.js";
import type { Request } from "../../src/core/http/Request.js";
import type { Response } from "../../src/core/http/Response.js";

export class HomeController extends Controller {
  protected name = "";

  index(req: Request, res: Response) {
    this.doSomething();

    res.json("hi " + this.name);
  }

  protected doSomething() {
    this.name = "amir";
  }
}
