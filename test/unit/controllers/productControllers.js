const { expect } = require("chai");
const sinon = require('sinon');

const ProductController = require('../../../controllers/productController');
const ProductModel = require('../../../models/productModel');


describe('Verifica se ao chamar "getAll" de "ProductController" ela possuí o comportamento esperado:', () => {

    it('Existe uma função getAll', () => {
        expect(typeof ProductController.getAll).to.be.equal('function');
    });

    describe('Ao buscar todos os produtos cadastrados no banco de dados', () => {
        
        const response = {};
        const request = {};

        before(() => {
            response.status = sinon.stub()
            .returns(response);
            response.json = sinon.stub()
            .returns(response);
            sinon.stub(ProductModel, 'getAll').resolves([]);
        });

        after(() => {
            ProductModel.getAll.restore();
        });

        it('Verifica se response.status 200', async () => {
            await ProductController.getAll(request, response);
            expect(response.status.calledWith(200)).to.be.equal(true);
        });

        it('Verifica se response.json retorna um array', async () => {
            await ProductController.getAll(request, response);
            expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
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