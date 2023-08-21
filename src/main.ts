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

app.use("/customers", customerRoute);

export const connectDB = async () => {
  try {
    if (process.env.MONGO_CONNECTION_STRING) {
      await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
        ignoreUndefined: true,
      });
      console.log("MongoDB Connected...");
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected Port: ${port}`);
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: `404 `,
  });
});
