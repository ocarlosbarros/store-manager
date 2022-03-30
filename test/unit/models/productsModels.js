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
                expect(product).to.be.an('array').that.is.empty;
            });

        });

        describe('Caso tenha produtos cadastrados no banco de dados', () => {

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
                const product = await ProductModel.getAll();
                expect(product).to.be.an('array').that.is.not.empty;
            });

            it('Verifica se o valor dentro do array é um objeto', async () => {
                const [product] = await ProductModel.getAll();
                expect(product).to.be.an('object');
            });

            it('Verifica se o produto dentro do array possui as chaves "id", "name", "quantity"', async () => {
                const [product] = await ProductModel.getAll();
                expect(product).to.have.all.keys('id', 'name', 'quantity');
            });
        });

        });
}); 

describe('Verifica se ao chamar "getById" de "ProductModel" ela possuí o comportamento esperado:', () => {

    it('Existe uma função getById', () => {
        expect(typeof ProductModel.getById).to.be.equal('function');
    });


});