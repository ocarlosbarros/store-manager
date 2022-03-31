const { expect } = require("chai");
const ProductController = require('../../../controllers/productController');

describe('Verifica se ao chamar "getAll" de "ProductController" ela possuí o comportamento esperado:', () => {

    it('Existe uma função getAll', () => {
        expect(typeof ProductController.getAll).to.be.equal('function');
    });
});