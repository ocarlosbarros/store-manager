const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');

const SaleModel = require('../../../models/saleModel');

describe('Verifica se ao chamar "getAll" de "SaleModel" ela possuí o comportamento esperado:', () => {
    
    it('Existe uma função getAll', () => {
        expect(typeof SaleModel.getAll).to.be.equal('function');
    });

    describe('Ao buscar todas as vendas cadastradas no banco de dados', () => {
        describe('Caso não tenham vendas cadastradas no banco de dados', () => {

            before(() => {
                sinon.stub(connection, 'execute').resolves([[], []]);
            });


            after(() => {
                connection.execute.restore;
            });


            it('O retorno é um array', async () => {
                const sales = await SaleModel.getAll();
                expect(sales).to.be.an('array');
            });

            it('O retorno é um array vazio', async () => {
                const sales = await SaleModel.getAll();
                expect(sales).to.be.an('array').that.is.empty;
            });

        });

        describe('Caso tenham vendas cadastradas no banco de dados', () => {
        });

    });

});