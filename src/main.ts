import express, { Request, Response } from "express";

const app = express();
// const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send(
    `
     Server is running...
    `
  );
});

try {
  app.listen(3000, async () => {
    console.log(`Connected Port: ${3000}`);
  });
} catch (error) {
  console.error(error);
}

app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: `404 `,
  });
});
