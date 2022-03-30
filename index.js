require('dotenv').config();
const express = require('express');
const ProductModel = require('./models/productModel');
const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', async (_request, response) => {
  const products = await ProductModel.getAll();

  return response.status(200).json(products);


});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
