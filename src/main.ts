import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { customerRoute } from "./route/customerRoute";
import mongoose from "mongoose";

dotenv.config();
mongoose.set("strictQuery", true);

var corsOptions = {
  origin: "*",
};

const app = express();
const port = process.env.PORT || 3000;

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

app.use("/customers", customerRoute);

const connection = async () => {
  try {
    if (!process.env.MONGO_CONNECTION_STRING) {
      throw new Error(
        "MONGO_CONNECTION_STRING environment variable is not defined."
      );
    }

    await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
      ignoreUndefined: true,
    });
    console.log("MongoDB Connected...");

    app.listen(port, async () => {
      console.log(`Connected: ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

connection();

app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: `404 `,
  });
});
