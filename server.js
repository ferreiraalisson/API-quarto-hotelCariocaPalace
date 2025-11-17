import app from "./app.js";

const port = 3003;

app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor do quarto rodando em http://0.0.0.0:${port}`);
});
