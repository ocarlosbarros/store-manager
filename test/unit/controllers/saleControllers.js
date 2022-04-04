const { expect } = require('chai');
const sinon = require('sinon');

const SaleController = require('../../../controllers/saleController');
const SaleService = require('../../../services/saleService');


describe('Verifica se ao chamar "getAll" de "SaleController" ela possuí o comportamento esperado:', () => {

    it('Existe uma função getAll', () => {
        expect(typeof SaleController.getAll).to.be.equal('function');
    });

    let request = {}, response = {}, next  =  {};
    
    describe('Quando getAll de SaleService retorna um erro', () => {

        const error = Error('Erro ao processar o serviço');

        before(() => {
            next = sinon.stub();
            sinon.stub(SaleService, 'getAll').throws(error);
        });

        after(() => {
            SaleService.getAll.restore();
        });

        it('next é chamado passando um Error', async () => {
            await SaleController.getAll(request, response, next);
            expect(next.calledWith(sinon.match(error))).to.be.equal(true);
        });

    });

    describe('Quando getAll de SaleService retorna um array de vendas', () => {

        before(() => {
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub().returns();
            sinon.stub(SaleService, 'getAll').resolves([]);
        });

        after(() => {
            SaleService.getAll.restore();
        });

        it('responde a requisição com status 200', async () => {
            await SaleController.getAll(request, response, next);
            expect(response.status.calledWith(200)).to.be.equal(true);
        });

        it('o método response.json retorna um array', async () => {
            await SaleController.getAll(request, response, next);
            expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
        });

    });
});

describe('Verifica se ao chamar "getById" de "ProductController" ela possuí o comportamento esperado:', () => {

    it('Existe uma função getById', () => {
        expect(typeof SaleController.getById).to.be.equal('function');
    });

    let request = {}, response = {}, next  =  {};
    
    describe('Quando getById de SaleService retorna um erro', () => {

        const error = Error('Erro ao processar o serviço');

        before(() => {
            next = sinon.stub();
            request.params = { id: 1 };
            sinon.stub(SaleService, 'getById').throws(error);
        });

        after(() => {
            SaleService.getById.restore();
        });

        it('next é chamado passando um Error', async () => {
            await SaleController.getById(request, response, next);
            expect(next.calledWith(sinon.match(error))).to.be.equal(true);
        });

    });

    describe('Quando getById de SaleService retorna uma venda', () => {
        let request = {}, response = {}, next = {};

        const saleExpected = {
            date: "2021-09-09T04:54:29.000Z",
            productId: 1,
            quantity: 2
          };

        before(() => {
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub().returns();
            request.params = { id: 1 };
            sinon.stub(SaleService, 'getById').resolves(saleExpected);
        });

        after(() => {
            SaleService.getById.restore();
        });

        it('responde a requisição com status 200', async () => {
            await SaleController.getById(request, response, next);
            expect(response.status.calledWith(200)).to.be.equal(true);
        });

        it('o método response.json é chamado passando um objeto', async () => {
            await SaleController.getById(request, response, next);
            expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
        });
    });

});

