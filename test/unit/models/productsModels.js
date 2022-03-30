const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const ProductModel = require('../../../models/productModel');

describe('Verifica se ao chamar "getAll" de "ProductModel" ela possuí o comportamento esperado:', () => {

    it('Existe uma função getAll', () => {
        expect(typeof ProductModel.getAll).to.be.equal('function');
    });

    describe('Ao buscar todos os produtos cadastrados no banco de dados', () => {
        describe('Caso não tenha produtos cadastrados no banco de dados', () => {

            before(() => {
                const expectResult = [[],[]];
                sinon.stub(connection, 'execute').resolves(expectResult);
            });
        
            after(() => {
                connection.execute.restore();
            });

            it('O retorno é um array', async () => {
                const product = await ProductModel.getAll();
                expect(product).to.be.an('array');
            });

            it('O retorno é um array vazio', async () => {
                const product = await ProductModel.getAll();
                expect(product).to.be.an('array');
                expect(product).to.be.an('array').that.is.empty;
            });

        });

        describe('Caso tenha produtos cadastrados no banco de dados', () => {

        });

        });

}); 