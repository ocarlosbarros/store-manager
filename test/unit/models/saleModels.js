const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');

const SaleModel = require('../../../models/saleModel');

describe.skip('Verifica se ao chamar "getAll" de "SaleModel" ela possuí o comportamento esperado:', () => {
    
    it('Existe uma função getAll', () => {
        expect(typeof SaleModel.getAll).to.be.equal('function');
    });

    describe('Ao buscar todas as vendas cadastradas no banco de dados', () => {
        describe('Caso não tenham vendas cadastradas no banco de dados', () => {

            before(() => {
                sinon.stub(connection, 'execute').resolves([[], []]);
            });


            after(() => {
                connection.execute.restore();
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

            const expectResult = [
                {   
                    id: 1,
                    name: "Portal Gun",
                    quantity: 10
                },
                {
                    "id": 2,
                    "name": "Microverse Battery",
                    "quantity": 5
                },
            ]

            before(() => {
                sinon.stub(connection, 'execute').resolves([expectResult, []]);
            });
        
            after(() => {
                connection.execute.restore();
            });
            
            it('Verifica se o array retornado não esta vazio', async () => {
                const sales = await SaleModel.getAll();
                expect(sales).to.be.an('array').that.is.not.empty;
            });

            it('Verifica se o valor dentro do array é um objeto', async () => {
                const [sales] = await SaleModel.getAll();
                expect(sales).to.be.an('object');
            });

            it('Verifica se o produto dentro do array possui as chaves "id", "name", "quantity"', async () => {
                const [sales] = await SaleModel.getAll();
                expect(sales).to.have.all.keys('id', 'name', 'quantity');
            });
        });
    });

});

describe('Verifica se ao chamar "getById" de "SaleModel" ela possuí o comportamento esperado:', () => {

    it('Existe uma função getById', () => {
        expect(typeof SaleModel.getById).to.be.equal('function');
    });

});