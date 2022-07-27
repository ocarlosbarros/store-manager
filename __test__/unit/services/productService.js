const { expect } = require('chai');
const sinon = require('sinon');

const ProductService = require('../../../services/productService');
const ProductModel = require('../../../models/productModel');

describe('Verifica se ao chamar "getAll" de "ProductService" ela possuí o comportamento esperado:', () => {
    
    it('Existe uma função getAll', () => {
        expect(typeof ProductService.getAll).to.be.equal('function');
    });

    describe('Ao buscar todos os produtos cadastrados no banco de dados', () => {
        describe('Caso não tenha produtos cadastrados no banco de dados', () => {

            before(() => {
                sinon.stub(ProductModel, 'getAll').resolves([]);
            });
        
            after(() => {
                ProductModel.getAll.restore();
            });

            it('O retorno é um array', async () => {
                const product = await ProductService.getAll();
                expect(product).to.be.an('array');
            });

            it('O retorno é um array vazio', async () => {
                const product = await ProductService.getAll();
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
                sinon.stub(ProductModel, 'getAll').resolves(expectResult);
            });
        
            after(() => {
                ProductModel.getAll.restore();
            });
            
            it('Verifica se o array retornado não esta vazio', async () => {
                const product = await ProductService.getAll();
                expect(product).to.be.an('array').that.is.not.empty;
            });

            it('Verifica se o valor dentro do array é um objeto', async () => {
                const [product] = await ProductService.getAll();
                expect(product).to.be.an('object');
            });

            it('Verifica se o produto dentro do array possui as chaves "id", "name", "quantity"', async () => {
                const [product] = await ProductService.getAll();
                expect(product).to.have.all.keys('id', 'name', 'quantity');
            });
        });
    }); 
});

describe('Verifica se ao chamar "getById" de "ProductService" ela possuí o comportamento esperado:', () => {

    it('Existe uma função getById', () => {
        expect(typeof ProductService.getById).to.be.equal('function');
    });

    describe('Ao buscar determinado produto pelo id informado', () => {
        describe('Caso não encontre o produto cadastrado com o id informado', () => {

            before(() => {
                sinon.stub(ProductModel, 'getById').resolves(false);
            });

            after(() => {
                ProductModel.getById.restore();
            });
            
            it('Retorna false caso não encontre o produto buscado pelo id informado', async () => {
                const result = await ProductService.getById(1);
                expect(result).to.be.false;
            });
            
        });
    })

    describe('Caso encontre o produto cadastrado com o id informado', () => {

        const productExpected = {
            id: 1,
            name: "Portal Gun",
            quantity: 10
        }
        

        before(() => {
            sinon.stub(ProductModel, 'getById').resolves(productExpected);
        });

        after(() => {
            ProductModel.getById.restore();
        });

        it('Verifica se o valor retornado é um objeto', async () => {
            const product = await ProductService.getById(1);
            expect(product).to.be.an('object');
        });

        it('Verifica se o objeto não está vazio', async () => {
            const product = await ProductService.getById(1);
            expect(product).to.be.not.empty;
        });

        it('Verifica se o valor retornado é um objeto com as keys id, name, quantity', async () => {
            const product = await ProductService.getById(1);
            expect(product).to.be.have.all.keys('id', 'name', 'quantity');
        });
    });
});

describe('Verifica se ao chamar "destroy" de "ProductService" ela possuí o comportamento esperado:', () => {

    it('Existe uma função destroy', () => {
        expect(typeof ProductService.destroy).to.be.equal('function');
    });

    describe('Ao deletar determinado produto pelo id informado', () => {
        describe('Caso não encontre o produto cadastrado com o id informado', () => {
            before(() => {
                sinon.stub(ProductModel, 'destroy').resolves(false);
            });

            after(() => {
                ProductModel.destroy.restore();
            });
            
            it('Retorna false caso não encontre o produto a ser deletado pelo id informado', async () => {
                const wasDeleted = await ProductService.destroy(999);
                expect(wasDeleted).to.be.false;
            });
            
        });

        describe('Caso encontre o produto com o id informado deleta o produto', () => {
            before(() => {
                sinon.stub(ProductModel, 'destroy').resolves(true);
            });

            after(() => {
                ProductModel.destroy.restore();
            });
            
            it('Retorna 1 caso tenha deletado o produto informado', async () => {
                const wasDeleted = await ProductService.destroy(1);
                expect(wasDeleted).to.be.true;
            });
        });
    });

});

describe('Verifica se ao chamar "create" de "ProductService" ela possuí o comportamento esperado:', () => {

    it('Existe uma função create', () => {
        expect(typeof ProductService.create).to.be.equal('function');
    });

    describe('Ao criar determinado produto', () => {
        describe('Existe um produto com o nome informado', () => {
            
            before(() => {
                sinon.stub(ProductModel, 'create').resolves(false);
                sinon.stub(ProductModel, 'getByName').resolves(true);
            });

            after(() => {
                ProductModel.create.restore();
                ProductModel.getByName.restore();
            });
            
            it('Retorna o produto criado', async () => {
                const created = await ProductService.create({ name: "Portal Gun", quantity: 10});
                expect(created).to.be.deep.equal(false);
            });
        });

        describe('Não existe um produto com o nome informado e o produto é cadastrado com sucesso', () => {
            
            const productExpected = {
                id: 1,
                name: "Portal Gun",
                quantity: 10
            }

            before(() => {
                sinon.stub(ProductModel, 'create').resolves(productExpected);
                sinon.stub(ProductModel, 'getByName').resolves(false);
            });

            after(() => {
                ProductModel.create.restore();
                ProductModel.getByName.restore();
            });
            
            it('Retorna o produto criado', async () => {
                const created = await ProductService.create({ name: "Portal Gun", quantity: 10});
                expect(created).to.be.deep.equal(productExpected);
            });
            
        });
    });

});

describe('Verifica se ao chamar "update" de "ProductService" ela possuí o comportamento esperado:', () => {

    it('Existe uma função update', () => {
        expect(typeof ProductService.update).to.be.equal('function');
    });

    describe('Ao atualizar determinado produto', () => {
        describe('Não existe um produto com o id informado para atualização', () => {

            before(() => {
                sinon.stub(ProductModel, 'update').resolves(false);
                sinon.stub(ProductModel, 'getById').resolves(false);
            });

            after(() => {
                ProductModel.update.restore();
                ProductModel.getById.restore();
            });
            
            it('Retorna false caso não tenha atualizado o produto pois não existe produto com id informado', async () => {
                const updated = await ProductService.update(999);
                expect(updated).to.be.equal(false);
            });
        });
                
        describe('Um produto é atualizado com sucesso', () => {
            
            const productExpected = {
                id: 1,
                name: "Portal Gun",
                quantity: 10
            }

            before(() => {
                sinon.stub(ProductModel, 'update').resolves(productExpected);
                sinon.stub(ProductModel, 'getById').resolves(true);

            });

            after(() => {
                ProductModel.update.restore();
                ProductModel.getById.restore();

            });
            
            it('Retorna o produto atualizado informado', async () => {
                const updated = await ProductService.update({ id: 1, name: "Portal Gun", quantity: 10});
                expect(updated).to.be.deep.equal(productExpected);
            });
            
        });
    });

});

