const { expect } = require("chai");
const sinon = require('sinon');

const ProductController = require('../../../controllers/productController');
const ProductModel = require('../../../models/productModel');
const ProductService = require('../../../services/productService');


describe('Verifica se ao chamar "getAll" de "ProductController" ela possuí o comportamento esperado:', () => {
    it('Existe uma função getAll', () => {
        expect(typeof ProductController.getAll).to.be.equal('function');
    });

    describe('Quando getAll de ProductService retorna um array de produtos', () => {
        let request = {}, response = {}, next = {};

        before(() => {
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub().returns();
            sinon.stub(ProductService, 'getAll').resolves([]);
        });
    
        after(() => {
            ProductService.getAll.restore();
        });

        it('responde a requisição com status', async () => {
            await ProductController.getAll(request, response, next);
            expect(response.status.calledWith(200)).to.be.equal(true);
        });

        it('retorna um array em response.json', async () => {
            await ProductController.getAll(request, response, next);
            expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
        });
    });

    describe('Quando getAll de ProductService retorna um erro', () => {
        let request = {}, response = {}, next = {};
        const error = Error('Erro ao processar o serviço');
        before(() => {
            next = sinon.stub().returns();
            sinon.stub(ProductService, 'getAll').throws(error);
        });
    
        after(() => {
            ProductService.getAll.restore();
        });

        it('next é chamado passando um Error', async () => {
            await ProductController.getAll(request, response, next);
            expect(next.calledWith(sinon.match(error))).to.be.equal(true);
        });

    });
});

describe('Verifica se ao chamar "getById" de "ProductController" ela possuí o comportamento esperado:', () => {
    
    it('Existe uma função getById', () => {
        expect(typeof ProductController.getById).to.be.equal('function');
    });

    describe('Quando getById de ProductService retorna um produto', () => {
    });

    describe('Quando getById de não retorna um produto', () => {
    });

    describe('Quando getById de ProductService retorna um erro', () => {
        let request = {}, response = {}, next = {};
        const error = Error('Erro ao processar o serviço');
        before(() => {
            next = sinon.stub().returns();
            request.params = { id: 1 }
            sinon.stub(ProductService, 'getById').throws(error);
        });
    
        after(() => {
            ProductService.getById.restore();
        });

        it('next é chamado passando um Error', async () => {
            await ProductController.getById(request, response, next);
            expect(next.calledWith(sinon.match(error))).to.be.equal(true);
        });
    });
});
