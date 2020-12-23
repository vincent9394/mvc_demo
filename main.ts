import express from "express";
import { Request, Response } from "express";
import path from "path";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const API_VERSION = "/api/v1";

app.get(`${API_VERSION}/test`, function (req: Request, res: Response) {
    res.json({ message: "Hello World" });
});

app.post(`${API_VERSION}/test`, function (req: Request, res: Response) {
    console.log("test", req.body);
    res.json({ message: "Hello World", body: req.body });
});

app.use(express.static(path.join(__dirname, "public")));

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`);
});
