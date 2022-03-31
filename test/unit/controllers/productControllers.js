const { expect } = require("chai");
const sinon = require('sinon');

const ProductController = require('../../../controllers/productController');
const ProductModel = require('../../../models/productModel');


describe('Verifica se ao chamar "getAll" de "ProductController" ela possuí o comportamento esperado:', () => {

    it('Existe uma função getAll', () => {
        expect(typeof ProductController.getAll).to.be.equal('function');
    });

    describe('Ao buscar todos os produtos cadastrados no banco de dados', () => {
        describe('Caso não tenha produtos cadastrados no banco de dados', () => {

        });

        describe('Caso tenha produtos cadastrados no banco de dados', () => {

        });
    });

    describe('Acontece um erro ao chamar ProductService', () => {
        let request = {}, response = {}, next = {};
        const error = Error('Erro ao processar o serviço');
        
        before(() => {
            next = sinon.stub().returns();
            sinon.stub(ProductModel, 'getAll').throws(error);
          });
      
          after(() => {
            ProductModel.getAll.restore();
          });

        it('Verifica se o "next" é chamado passando um Error', async () => {
            await ProductController.getAll(request, response, next);
            expect(next.calledWith(sinon.match(error))).to.be.equal(true);
        });
    });
});