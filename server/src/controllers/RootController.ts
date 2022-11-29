import { Request, Response } from "express";
import { get, controller } from "./decorators";
import path from "path";
@controller("")
class RootController {

    @get("/")
    getRoot(req: Request, res: Response): void {
        
        res.redirect("http://localhost:3001/");
    }
}