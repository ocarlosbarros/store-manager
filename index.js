require('dotenv').config();
const express = require('express');
const ProductModel = require('./models/productModel');
const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', async (_request, response) => {
  const products = await ProductModel.getAll();

  return response.status(200).json(products);


});

app.get('/products/:id', async (request, response) => {
  const { id } = request.params;
  const product = await ProductModel.getById(id);

  return response.status(200).json(product);


});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
