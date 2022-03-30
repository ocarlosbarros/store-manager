const { expect } = require('chai');
const ProductModel = require('../../../models/productModel');

describe('Verifica se ao chamar "getAll" de "ProductModel" ela possuí o comportamento esperado:', () => {

    it('Existe uma função getAll', () => {
        expect(typeof ProductModel.getAll).to.be.equal('function');
    });

}); 