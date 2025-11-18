import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`Servidor do quarto rodando em http://localhost:${port}`);
});
