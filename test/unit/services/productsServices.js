const { expect } = require('chai');
const sinon = require('sinon');

const ProductService = require('../../../services/productService');
const ProductModel = require('../../../models/productModel');

describe('Verifica se ao chamar "getAll" de "ProductService" ela possuí o comportamento esperado:', () => {
    
    it('Existe uma função getAll', () => {
        expect(typeof ProductService.getAll).to.be.equal('function');
    });

    describe('Ao buscar todos os produtos cadastrados no banco de dados', () => {
        describe('Caso não tenha produtos cadastrados no banco de dados', () => {

            before(() => {
                sinon.stub(ProductModel, 'getAll').resolves([]);
            });
        
            after(() => {
                ProductModel.getAll.restore();
            });

            it('O retorno é um array', async () => {
                const product = await ProductService.getAll();
                expect(product).to.be.an('array');
            });

            it('O retorno é um array vazio', async () => {
                const product = await ProductService.getAll();
                expect(product).to.be.an('array').that.is.empty;
            });

        });

    }); 
});