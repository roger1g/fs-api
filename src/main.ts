import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { customerRoute } from "./route/customerRoute";
import { connectDB } from "./config/db.js";

dotenv.config();

var corsOptions = {
  origin: "*",
};

const app = express();
const port = process.env.PORT || 3500;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send(
    `
     Server is running...
    `
  );
});

connectDB();

app.use("/customers", customerRoute);

app.listen(port, async () => {
  console.log(`Connected: ${port}`);
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: `404 `,
  });
});
