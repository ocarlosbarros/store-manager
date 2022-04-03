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

describe('Verifica se ao chamar "getById" de "SaleService" ela possuí o comportamento esperado:', () => {

    it('Existe uma função getById', () => {
        expect(typeof SaleService.getById).to.be.equal('function');
    });
    
    describe('Caso não encontre a venda cadastrada com o id informado', () => {

        before(() => {
            sinon.stub(SaleModel, 'getById').resolves(false);
        });

        after(() => {
            SaleModel.getById.restore();
        });

        it('Retorna false caso não encontre a venda buscada pelo id informado', async () => {
            const result = await SaleService.getById();
            expect(result).to.be.equal(false);
        });

    });

    describe('Caso encontre a venda cadastrada com o id informado', () => {

        
    });
});
