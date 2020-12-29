import { Request, Response, NextFunction } from "express";

export function isLoggedInHTML(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (req.session?.["user"]) {
        next();
    } else {
        res.redirect("/login.html");
    }
}

export function isLoggedInAPI(req: Request, res: Response, next: NextFunction) {
    if (req.session?.["user"]) {
        next();
    } else {
        res.status(401).json({ message: "You must be logged in" });
        return;
    }
}
