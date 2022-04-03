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

