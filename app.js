import express from "express";
import cors from "cors";
import roomRoutes from "./src/routes/roomRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(roomRoutes);

app.get("/", (req, res) => {
  res.send("API Hotel Backend funcionando!");
});

export default app;
