const { expect } = require('chai');
const sinon = require('sinon');

const SaleService = require('../../../services/saleService');
const SaleModel = require('../../../models/saleModel');

describe('Verifica se ao chamar "getAll" de "SaleService" ela possuí o comportamento esperado:', () => {
    
    it('Existe uma função getAll', () => {
        expect(typeof SaleService.getAll).to.be.equal('function');
    });

    describe('Ao buscar todos os produtos cadastrados no banco de dados', () => {

        describe('Caso não tenha produtos cadastrados no banco de dados', () => {

            before(() => {
                sinon.stub(SaleModel, 'getAll').resolves([]);
            });

            after(() => {
                SaleModel.getAll.restore();
            });

            it('O retorno é um array', async () => {
                const sales = await SaleService.getAll();
                expect(sales).to.be.an('array');
            });

            it('O retorno é um array vazio', async () => {
                const sales = await SaleService.getAll();
                expect(sales).to.be.an('array').that.is.empty;
            });

        });
    });
});
