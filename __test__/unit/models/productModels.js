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
                sinon.stub(connection, 'execute').resolves([[],[]]);
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

    describe('Ao buscar determinado produto pelo id informado', () => {
        describe('Caso não encontre o produto cadastrado com o id informado', () => {

            before(() => {
                sinon.stub(connection, 'execute').resolves([[],[]]);
            });

            after(() => {
                connection.execute.restore();
            });
            
            it('Retorna false caso não encontre o produto buscado pelo id informado', async () => {
                const result = await ProductModel.getById();
                expect(result).to.be.false;
            });
            
        });

        describe('Caso encontre o produto cadastrado com o id informado', () => {

            const productExpected = {
                id: 1,
                name: "Portal Gun",
                quantity: 10
            }
            

            before(() => {
                sinon.stub(connection, 'execute').resolves([[productExpected],[]]);
            });

            after(() => {
                connection.execute.restore();
            });

            it('Verifica se o valor retornado é um objeto', async () => {
                const product = await ProductModel.getById(1);
                expect(product).to.be.an('object');
            });

            it('Verifica se o objeto não está vazio', async () => {
                const product = await ProductModel.getById(1);
                expect(product).to.be.not.empty;
            });

            it('Verifica se o valor retornado é um objeto com as keys id, name, quantity', async () => {
                const product = await ProductModel.getById(1);
                expect(product).to.be.have.all.keys('id', 'name', 'quantity');
            });
        });
    });
});

describe('Verifica se ao chamar "destroy" de "ProductModel" ela possuí o comportamento esperado:', () => {

    it('Existe uma função destroy', () => {
        expect(typeof ProductModel.destroy).to.be.equal('function');
    });

    describe('Ao deletar determinado produto pelo id informado', () => {
        describe('Caso não encontre o produto cadastrado com o id informado', () => {
            const affectedRows = { affectedRows: false };
            before(() => {
                sinon.stub(connection, 'execute').resolves([affectedRows]);
            });

            after(() => {
                connection.execute.restore();
            });
            
            it('Retorna 0 caso não encontre o produto a ser deletado pelo id informado', async () => {
                const wasDeleted = await ProductModel.destroy(999);
                expect(wasDeleted).to.be.false;
            });
            
        });

        describe('Caso encontre o produto com o id informado deleta o produto', () => {
            const wasDeleted = { affectedRows: true };
            before(() => {
                sinon.stub(connection, 'execute').resolves([wasDeleted]);
            });

            after(() => {
                connection.execute.restore();
            });
            
            it('Retorna 1 caso tenha deletado o produto informado', async () => {
                const wasDeleted = await ProductModel.destroy(1);
                expect(wasDeleted).to.be.true;
            });
        });
    });

});

describe('Verifica se ao chamar "create" de "ProductModel" ela possuí o comportamento esperado:', () => {

    it('Existe uma função create', () => {
        expect(typeof ProductModel.create).to.be.equal('function');
    });

    describe('Ao criar determinado produto', () => {
        describe('Um produto é cadastrado com sucesso', () => {
            const insertId = { insertId: 1 };
            
            const productExpected = {
                id: 1,
                name: "Portal Gun",
                quantity: 10
            }

            before(() => {
                sinon.stub(connection, 'execute').resolves([insertId]);
            });

            after(() => {
                connection.execute.restore();
            });
            
            it('Retorna 0 caso não encontre o produto buscado pelo id informado', async () => {
                const created = await ProductModel.create({ name: "Portal Gun", quantity: 10});
                expect(created).to.be.deep.equal(productExpected);
            });
            
        });
    });

});

describe('Verifica se ao chamar "getByName" de "ProductModel" ela possuí o comportamento esperado:', () => {

    it('Existe uma função getByName', () => {
        expect(typeof ProductModel.getByName).to.be.equal('function');
    });

    describe('Ao criar determinado produto', () => {
        describe('Caso não encontre o produto cadastrado com o name informado', () => {
            
            before(() => {
                sinon.stub(connection, 'execute').resolves([[], []]);
            });

            after(() => {
                connection.execute.restore();
            });

            
            it('Retorna false caso não encontre o produto com o name informado', async () => {
                const product = await ProductModel.getByName('Portal Gun');
                expect(product).to.be.equal(false);
            });

        });

        describe('Caso encontre o produto cadastrado com o name informado', () => {

            const productExpected = {
                id: 1,
                name: "Portal Gun",
                quantity: 10
            }

            before(() => {
                sinon.stub(connection, 'execute').resolves([[productExpected], []]);
            });

            after(() => {
                connection.execute.restore();
            });

            
            it('Retorna true caso encontre o produto com o name informado', async () => {
                const product = await ProductModel.getByName('Portal Gun');
                expect(product).to.be.equal(true);
            });

        });
    });
});

describe('Verifica se ao chamar "update" de "ProductModel" ela possuí o comportamento esperado:', () => {

    it('Existe uma função update', () => {
        expect(typeof ProductModel.update).to.be.equal('function');
    });

    describe('Ao atualizar determinado produto', () => {
        describe('Não existe um produto com o id informado para atualização', () => {

            const wasUpdated = { affectedRows: false };

            before(() => {
                sinon.stub(connection, 'execute').resolves([wasUpdated]);
            });

            after(() => {
                connection.execute.restore();
            });
            
            it('Retorna false caso não tenha atualizado o produto pois não existe produto com id informado', async () => {
                const updated = await ProductModel.update(999);
                expect(updated).to.be.equal(false);
            });

        });
                
        describe('Um produto é atualizado com sucesso', () => {
            
            const productExpected = {
                id: 1,
                name: "Portal Gun",
                quantity: 10
            }

            const wasUpdated = { affectedRows: true };


            before(() => {
                sinon.stub(connection, 'execute').resolves([wasUpdated]);
            });

            after(() => {
                connection.execute.restore();
            });
            
            it('Retorna o produto atualizado informado', async () => {
                const updated = await ProductModel.update({ id: 1, name: "Portal Gun", quantity: 10});
                expect(updated).to.be.deep.equal(productExpected);
            });
            
        });
    });

});

