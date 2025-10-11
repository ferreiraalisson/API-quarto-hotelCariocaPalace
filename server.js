import app from './app.js';

const port = 3001;

app.listen(port, () => {
  console.log(`Servidor do quarto rodando em http://localhost:${port}`);
});
