import express, { Express, Request, Response } from "express";
import { usersController } from "./controllers/users.controller";
// import { authController } from "./controllers/auth.controller";


export const app: Express = express();

// Parse les corps de requête JSON (req.body)
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("JEU RPG");
});

app.use("/user", usersController);
// app.use("/auth", authController);

