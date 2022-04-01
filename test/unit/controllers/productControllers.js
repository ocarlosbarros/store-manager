const { expect } = require("chai");
const sinon = require('sinon');

const ProductController = require('../../../controllers/productController');
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

        it('responde a requisição com status 200', async () => {
            await ProductController.getAll(request, response, next);
            expect(response.status.calledWith(200)).to.be.equal(true);
        });

        it('o método response.json retorna um array', async () => {
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
        let request = {}, response = {}, next = {};

        const productExpected = {
            id: 1,
            name: "Portal Gun",
            quantity: 10
        }

        before(() => {
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub().returns();
            request.params = { id: 1 };
            sinon.stub(ProductService, 'getById').resolves(productExpected);
        });

        after(() => {
            ProductService.getById.restore();
        });

        it('responde a requisição com status 200', async () => {
            await ProductController.getById(request, response, next);
            expect(response.status.calledWith(200)).to.be.equal(true);
        });

        it('o método response.json é chamado passando um objeto', async () => {
            await ProductController.getById(request, response, next);
            expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
        });
    });

    describe('Quando getById de ProductService não retorna um produto', () => {
        let request = {}, response = {}, next = {};
        const message = { message: "Product not found" };

        before(() => {
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub().returns();
            request.params = { id: 1 };
            sinon.stub(ProductService, 'getById').resolves(false);
        });

        after(() => {
            ProductService.getById.restore();
        });

        it('responde a requisição com status 404', async () => {
            await ProductController.getById(request, response, next);
            expect(response.status.calledWith(404)).to.be.equal(true);
        });

        it('o método response.json é chamado passando a mensangem  "Product not found"', async () => {
            await ProductController.getById(request, response, next);
            expect(response.json.calledWith(message)).to.be.true;
        });
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
